import { Test, TestingModule } from '@nestjs/testing';
import { VoucherReadService } from './voucher-read.service';

describe('VoucherService', () => {
  let service: VoucherReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoucherReadService],
    }).compile();

    service = module.get<VoucherReadService>(VoucherReadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
