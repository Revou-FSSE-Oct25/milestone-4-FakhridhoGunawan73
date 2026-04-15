import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtGuard)
  @Post()
  createAccount(@Request() req, @Body() dto: CreateAccountDto) {
    return this.accountService.createAccount(req.user.sub, dto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAllAccounts(@Request() req) {
    return this.accountService.findAllAccounts(req.user.sub);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findOneAccount(@Request() req, @Param('id') id: string) {
    return this.accountService.findOneAccount(+id, req.user.sub);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  updateAccount(@Request() req, @Param('id') id: string, @Body() dto: UpdateAccountDto){
    return this.accountService.updateAccount(+id, req.user.sub, dto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteAccount(@Request() req, @Param('id') id: string){
    return this.accountService.deleteAccount(+id, req.user.sub);
  }
}
