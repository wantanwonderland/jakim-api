import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HijriModule } from './api/hijri/hijri.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JakimDate } from './database/entity/jakim-date.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'jakim',
      type: 'mysql',
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [JakimDate],
      synchronize: true,
    }),
    ,
    HijriModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
