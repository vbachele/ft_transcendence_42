import { Test, TestingModule } from '@nestjs/testing';
import { Mail2FaController } from './mail2FA.controller';

describe('Mail2FaController', () => {
  let controller: Mail2FaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Mail2FaController],
    }).compile();

    controller = module.get<Mail2FaController>(Mail2FaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
