import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService ) {}

    async deposit(userId: number, dto: DepositDto) {
        const account = await this.prisma.account.findUnique({
            where: { id: dto.accountId },
        });
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        if (account.userId !== userId ) {
            throw new BadRequestException('Account does not belong to user');
        }
        const updatedAccount = await this.prisma.account.update({
            where: { id: dto.accountId },
            data: { balance: new Decimal (account.balance).plus(dto.amount) },
        });
        const transaction = await this.prisma.transaction.create({
            data: {
                type: 'DEPOSIT',
                amount: dto.amount,
                toAccountId: dto.accountId,
            },
        });
        return { updatedAccount, transaction };
    }
    async withdraw(userId: number, dto: WithdrawDto) {
        const account = await this.prisma.account.findUnique({
            where: { id: dto.accountId },
        });
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        if (account.userId !== userId) {
            throw new BadRequestException('Account does not belong to user');
        }
        if (new Decimal (account.balance).lessThan(dto.amount)) {
            throw new BadRequestException('Insufficient balance');
        }
        const updatedAccount = await this.prisma.account.update({
            where: { id: dto.accountId },
            data: { balance: new Decimal (account.balance).minus(dto.amount) },
        });
        const transaction = await this.prisma.transaction.create({
            data: {
                type: 'WITHDRAWAL',
                amount: dto.amount,
                fromAccountId: dto.accountId,
            },
        });
        return {updatedAccount, transaction};
    }
    async transfer(userId: number, dto: TransferDto){
        const fromAccount = await this.prisma.account.findUnique({
            where: { id: dto.fromAccountId }, 
        });
        if (!fromAccount) {
            throw new NotFoundException('Source account not found');
        }
        if (fromAccount.userId !== userId ) {
            throw new BadRequestException('Account does not belong to user');
        }
        if (new Decimal(fromAccount.balance).lessThan(dto.amount)) {
            throw new BadRequestException('Insufficient balance');
        }
        const toAccount = await this.prisma.account.findUnique({
            where: { id: dto.toAccountId },
        });
        if (!toAccount) {
            throw new NotFoundException('Destination account not found');
        }
        const [, , transaction] = await this.prisma.$transaction([
            this.prisma.account.update({
                where : { id: dto.fromAccountId },
                data: { balance: new Decimal (fromAccount.balance).minus (dto.amount) },
            }),
            this.prisma.account.update({
                where: { id: dto.toAccountId },
                data: { balance: new Decimal (toAccount.balance).plus (dto.amount) },
            }),
            this.prisma.transaction.create({
                data: {
                    type: 'TRANSFER',
                    amount: dto.amount,
                    fromAccountId: dto.fromAccountId,
                    toAccountId: dto.toAccountId,
                },
            }),
        ]);
        return { transaction };
    }
    async findAllTransactions(userId : number) {
        return this.prisma.transaction.findMany({
            where: {
                OR: [
                    { fromAccount: { userId } },
                    { toAccount: { userId } },
                ],
            },
        });
    }
    async findOneTransaction(id: number, userId: number) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: {
                fromAccount: true,
                toAccount: true,
            },
        });
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        const belongsToUser = 
            transaction.fromAccount?.userId === userId ||
            transaction.toAccount?.userId === userId;

        if (!belongsToUser) {
            throw new NotFoundException('Transaction not found');
        }    
        return transaction;
    }
}
