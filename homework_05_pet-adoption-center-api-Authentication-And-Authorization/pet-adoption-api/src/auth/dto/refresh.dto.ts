import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    description: 'The ID of the user to refresh tokens for',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'The refresh token issued during login',
  })
  @IsString()
  refreshToken!: string;
}
