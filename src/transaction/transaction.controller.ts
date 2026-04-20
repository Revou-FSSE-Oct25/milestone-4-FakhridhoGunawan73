import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtGuard)
  @Post('deposit')
  deposit(@Request() req, @Body() dto: DepositDto) {
    return this.transactionService.deposit(req.user.sub, dto);
  }

  @UseGuards(JwtGuard)
  @Post('withdraw')
  withdraw(@Request() req, @Body() dto: WithdrawDto) {
    return this.transactionService.withdraw(req.user.sub, dto);
  }

  @UseGuards(JwtGuard)
  @Post('transfer')
  transfer(@Request() req, @Body() dto: TransferDto) {
    return this.transactionService.transfer(req.user.sub, dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAllTransactions(@Request() req) {
    return this.transactionService.findAllTransactions(req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOneTransaction(@Param('id') id: string) {
    return this.transactionService.findOneTransaction(+id);
  }
}
