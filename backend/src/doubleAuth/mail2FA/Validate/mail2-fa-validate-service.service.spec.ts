import { Test, TestingModule } from '@nestjs/testing';
import { Mail2FaValidateServiceService } from './mail2FAValidate.service';

describe('Mail2FaValidateServiceService', () => {
  let service: Mail2FaValidateServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mail2FaValidateServiceService],
    }).compile();

    service = module.get<Mail2FaValidateServiceService>(Mail2FaValidateServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
