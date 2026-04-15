import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
    constructor(private prisma: PrismaService ) {}

    async createAccount(userId: number, dto: CreateAccountDto) {
        const accountNumber = Date.now().toString();
        return this.prisma.account.create({
            data: {
                accountNumber,
                type: dto.type,
                userId,
            },
        });
    }
    async findAllAccounts(userId: number) {
        return this.prisma.account.findMany({
            where: { userId },
        });
    }
    async findOneAccount(id: number, userId: number) {
        const account = await this.prisma.account.findUnique({
            where: { id },
        });
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        if (account.userId !== userId) {
            throw new NotFoundException('Account not found');
        }
        return account;
    }
    async updateAccount(id: number, userId: number, dto: UpdateAccountDto) {
        await this.findOneAccount(id, userId);

        return this.prisma.account.update({
            where: { id },
            data: dto,
        });
    }
    async deleteAccount(id: number, userId: number) {
        await this.findOneAccount(id, userId);

        return this.prisma.account.delete({
            where: { id },
        });
    }
}
