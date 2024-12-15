import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { HardwareConfigService } from '@hardware-configs/hardware-config.service';
import { CreateHardwareConfigDto } from '@hardware-configs/dto/create-hardware-config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RolesGuard } from '@auth/guard/role.guard';
import { UserRole } from '@users/enities/user.entity';

@ApiTags('Hardware Configs')
@Controller('hardware-configs')
export class HardwareConfigController {
  constructor(private readonly hardwareConfigService: HardwareConfigService) {}

  @Get()
  async getHardwareConfigs() {
    return await this.hardwareConfigService.getHardwareConfigs();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createHardwareConfig(
    @Body() createHardwareConfigDto: CreateHardwareConfigDto,
  ) {
    return await this.hardwareConfigService.createHardwareConfig(
      createHardwareConfigDto,
    );
  }

  @Patch(':hardwareConfigId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateHardwareConfig(
    @Param('hardwareConfigId', ParseIntPipe) hardwareConfigId: number,
    @Body() updateHardwareConfigDto: CreateHardwareConfigDto,
  ) {
    return await this.hardwareConfigService.updateHardwareConfig(
      hardwareConfigId,
      updateHardwareConfigDto,
    );
  }

  @Delete(':hardwareConfigId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async deleteHardwareConfig(
    @Param('hardwareConfigId', ParseIntPipe) hardwareConfigId: number,
  ) {
    return await this.hardwareConfigService.deleteHardwareConfig(
      hardwareConfigId,
    );
  }
}
