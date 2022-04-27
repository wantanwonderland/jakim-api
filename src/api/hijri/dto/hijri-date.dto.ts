import { ApiProperty } from '@nestjs/swagger';

export class HijriDateDTO {
  @ApiProperty()
  date: string;

  @ApiProperty()
  hijri: string;
}
