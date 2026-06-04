import { Controller, Get, Redirect } from '@nestjs/common';

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}

@Controller()
export class AppController {
  
  @Get()
  @Redirect('/health', 302)
  root(): void {}

  @Get('health')
  health(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}

