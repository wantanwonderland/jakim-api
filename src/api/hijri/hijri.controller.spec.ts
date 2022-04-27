import { Test, TestingModule } from '@nestjs/testing';
import { HijriController } from './hijri.controller';

describe('HijriController', () => {
  let controller: HijriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HijriController],
    }).compile();

    controller = module.get<HijriController>(HijriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
