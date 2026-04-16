import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d'},
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, JwtGuard],
})
export class TransactionModule {}
