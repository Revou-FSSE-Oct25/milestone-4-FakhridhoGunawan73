import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getProfile(userId: number) {
        return this.prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }

    async updateProfile(userId: number, dto: UpdateProfileDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: dto,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                updatedAt: true,
            },
        });
    }
}
