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
import { OperationSystemService } from '@operation-systems/operation-system.service';
import { CreateOperationSystemDto } from '@operation-systems/dto/create-operation-system.dto';
import { UpdateOperationSystemDto } from './dto/update-operation-system.dto';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RolesGuard } from '@auth/guard/role.guard';
import { UserRole } from '@users/enities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Operation Systems')
@Controller('operation-systems')
export class OperationSystemController {
  constructor(
    private readonly operationSystemService: OperationSystemService,
  ) {}

  @Get()
  async getOperationSystems() {
    return await this.operationSystemService.getOperationSystems();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createOperationSystem(
    @Body() createOperationSystemDto: CreateOperationSystemDto,
  ) {
    return await this.operationSystemService.createOperationSystem(
      createOperationSystemDto,
    );
  }

  @Patch(':operationSystemId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateOperationSystem(
    @Param('operationSystemId', ParseIntPipe) operationSystemId: number,
    @Body() updateOperationSystemDto: UpdateOperationSystemDto,
  ) {
    return await this.operationSystemService.updateOperationSystem(
      operationSystemId,
      updateOperationSystemDto,
    );
  }

  @Delete(':operationSystemId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async deleteOperationSystem(
    @Param('operationSystemId', ParseIntPipe) operationSystemId: number,
  ) {
    return await this.operationSystemService.deleteOperationSystem(
      operationSystemId,
    );
  }
}
