import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { VpsService } from '@vpses/vps.service';
import { CreateVpsDto } from '@vpses/dto/create-vps.dto';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RolesGuard } from '@auth/guard/role.guard';
import { UserRole } from '@users/enities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('VPS-ES')
@ApiBearerAuth()
@Controller('vpses')
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('roles', [UserRole.USER, UserRole.ADMIN])
export class VpsController {
  constructor(private readonly vpsService: VpsService) {}

  @Get()
  async getUserVpses(@Request() request) {
    return await this.vpsService.getUserVpses(request.user.sub);
  }

  @Get(':vpsId')
  async getVps(
    @Param('vpsId', ParseUUIDPipe) vpsId: string,
    @Request() request,
  ) {
    return await this.vpsService.getVps(vpsId, request.user.sub);
  }

  @Post()
  async createVps(@Body() createVpsDto: CreateVpsDto, @Request() request) {
    return await this.vpsService.createVps(request.user.sub, createVpsDto);
  }
}
