import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}

@ApiTags('Health')
@Controller()
export class AppController {

  @Get()
  getRoot() {
    return { message: 'Pet Adoption API is running' };
  }

  @Get()
  @Redirect('/health', 302)
  root(): void {}

  @Get('health')
  @ApiOperation({ summary: 'Check API health' })
  @ApiOkResponse({
    description: 'Health status',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-06-07T12:00:00.000Z',
        uptime: 123.45,
      },
    },
  })
  health(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
