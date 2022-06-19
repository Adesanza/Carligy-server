import { ApiProperty } from '@nestjs/swagger';

export class JoinWaitlist {
  @ApiProperty({
    description: 'server response message',
  })
  message: string;

  @ApiProperty({
    description: 'server response status',
  })
  success: boolean;
}
