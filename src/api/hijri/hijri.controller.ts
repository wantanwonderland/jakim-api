import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JakimDate } from 'src/database/entity/jakim-date.entity';
import { JakimDateDbService } from 'src/database/service/jakim-date.db.service';
import { HijriDateDTO } from './dto/hijri-date.dto';
import { entries } from 'lodash';

@Controller('api')
export class HijriController {
  constructor(
    private jakimDateDbService: JakimDateDbService,
    private httpService: HttpService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Sync Date',
    type: String,
  })
  @ApiParam({
    name: 'year',
    type: Number,
  })
  @ApiTags('Hijri Date')
  @Get('sync/:year')
  async getSyncData(@Res() res, @Param('year') year) {
    try {
      const jakimData = await this.httpService
        .get(
          'https://www.e-solat.gov.my/index.php?r=esolatApi/tarikhtakwim&period=year&datetype=miladi&year=' +
            year,
        )
        .toPromise();

      const takwim = jakimData.data.takwim;

      const toArray = entries(takwim);

      const jakimDates = new Array<JakimDate>();

      toArray.forEach((element: any) => {
        const item = new JakimDate();
        item.date = element[0];
        item.hijriDate = element[1];

        jakimDates.push(item);
      });

      await this.jakimDateDbService.save(jakimDates);

      return res.status(HttpStatus.OK).json('OK');
    } catch (err) {
      console.log(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('INTERNAL_SERVER_ERROR');
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Return jakim hijri date',
    type: [HijriDateDTO],
  })
  @ApiTags('Hijri Date')
  @Get('date')
  async getDate(@Req() req, @Res() res) {
    try {
      const dates = await this.jakimDateDbService.getAll();

      const data = new Array<HijriDateDTO>();

      dates.forEach((element) => {
        const item = new HijriDateDTO();

        item.date = element.date;
        item.hijri = element.hijriDate;

        data.push(item);
      });

      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      console.log(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('INTERNAL_SERVER_ERROR');
    }
  }
}
