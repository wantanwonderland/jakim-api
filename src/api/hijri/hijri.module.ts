import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JakimDate } from 'src/database/entity/jakim-date.entity';
import { JakimDateDbService } from 'src/database/service/jakim-date.db.service';
import { HijriController } from './hijri.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JakimDate], 'jakim'), HttpModule],
  controllers: [HijriController],
  providers: [JakimDateDbService],
})
export class HijriModule {}
