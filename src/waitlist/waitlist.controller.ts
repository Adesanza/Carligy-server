import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { WaitlistUserDto } from './dto';
import { JoinWaitlist } from './entiities';
import { WaitlistService } from './waitlist.service';

@Controller('waitlist')
@ApiTags('Waitlist')
export class WaitlistController {
  constructor(private readonly service: WaitlistService) {}
  /**
   * @param {WaitlistUserDto} dto
   * @returns {Promise<void>}
   * @description This is the controller for joining the waitlist.
   */
  @Post('join')
  @ApiCreatedResponse({
    type: JoinWaitlist,
    description: 'Join the waitlist',
  })
  async joinWaitlist(@Body() dto: WaitlistUserDto) {
    await this.service.joinWaitlist(dto);
    return { success: true, message: 'added to the waitlist' };
  }
}
