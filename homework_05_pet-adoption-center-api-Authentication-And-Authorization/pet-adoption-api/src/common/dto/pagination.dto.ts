import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Number of records per page',
    example: 10,
    default: 10,
  })
  pageSize: number = 10;
}
