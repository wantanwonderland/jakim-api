import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JakimDate } from '../entity/jakim-date.entity';

export class JakimDateDbService {
  constructor(
    @InjectRepository(JakimDate, 'jakim')
    private prayerRepository: Repository<JakimDate>,
  ) {}

  getAll() {
    return this.prayerRepository.find({
      order: {
        date: 'ASC',
      },
    });
  }

  save(data) {
    return this.prayerRepository.save(data);
  }
}
