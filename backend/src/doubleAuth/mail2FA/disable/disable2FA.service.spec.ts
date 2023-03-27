import { Test, TestingModule } from '@nestjs/testing';
import { DisableService } from './disable2Fa.service';

describe('DisableService', () => {
  let service: DisableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisableService],
    }).compile();

    service = module.get<DisableService>(DisableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
