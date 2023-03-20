import { Test, TestingModule } from '@nestjs/testing';
import { Mail2FaGenerateService } from './Generate/mail2FAGenerate.service';

describe('Mail2FaService', () => {
  let service: Mail2FaGenerateService ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mail2FaGenerateService ],
    }).compile();

    service = module.get<Mail2FaGenerateService >(Mail2FaGenerateService );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
