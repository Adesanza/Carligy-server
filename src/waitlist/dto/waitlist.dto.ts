import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class WaitlistUserDto {
  @ApiProperty({
    description: "user's email",
  })
  @IsEmail()
  email: string;
}
