import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProducerService } from './producer.service';
import { QueueConsumer } from './queue.consumer';

@Module({
    imports: [
        BullModule.registerQueue(
            {
                name: 'voucher-pool-quueue',
            }
        ),
    ],
    providers: [
        ProducerService,
        QueueConsumer,
    ],
    exports: [
        ProducerService,
    ]
})

export class MessengerModule {}
