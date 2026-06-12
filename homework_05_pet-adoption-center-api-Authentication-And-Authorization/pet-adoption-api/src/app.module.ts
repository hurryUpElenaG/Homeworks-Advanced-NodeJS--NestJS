import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './db/database.module';
import { PetModule } from './pet/pet.module';
import { ShelterModule } from './shelter/shelter.module';
import { TagModule } from './tag/tag.module';
import { AdopterModule } from './adopter/adopter.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    PetModule,
    ShelterModule,
    TagModule,
    AdopterModule,
    LoggerModule.forRoot({ level: 'info' }),
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
