import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contacts.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: Partial<Contact>) {
    console.log('Received POST /contacts:', createContactDto);
    return this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.contactsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: Partial<Contact>,
  ) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.contactsService.delete(id);
    return { message: 'Contact deleted' };
  }
}
