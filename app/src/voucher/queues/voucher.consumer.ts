import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Voucher } from "src/voucher/voucher.entity";
import { EntityManager } from "typeorm";
import * as voucherCodeGenerator from 'voucher-code-generator';

@Processor('voucher-pool-quueue')
export class VoucherConsumer {

    constructor(private readonly em: EntityManager) {}

    @Process('voucher-store-job')
    async readOperationJob(job: Job<any>) {
        const data = job.data;
        console.log('Start voucher generation for customer: ', data.customerId, ' with offer: ', data.offerId);
        try {
            await this.em.transaction(async transactionalEntityManager => {
                const voucher: Voucher = new Voucher();
                voucher.voucherCode = voucherCodeGenerator.generate({length: 8});
                voucher.offerId = data.offerId;
                voucher.customerId = data.customerId;
                voucher.expirationDate = new Date(data.offerExoirationDate);

                await transactionalEntityManager.save(voucher);
                console.log('voucher generated successfully for customer: ', data.customerId, ' with offer: ', data.offerId);
            });
        } catch (e) {
            console.error("Can't create voucher for customer:", data.customerId, " with offer:", data.offerId, e);
            throw e;
        }
    }
}
