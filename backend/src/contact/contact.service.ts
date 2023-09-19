import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>){}

    public async create(contact: Contact): Promise<Contact> {
        return await this.contactRepository.save(contact)
    }

    public async readAll(): Promise<Contact[]> {
        return await this.contactRepository.find()
    }

    public async update(contact: Contact): Promise<UpdateResult> {
        return await this.contactRepository.update(contact.id, contact)
    }

    public async delete(id: string): Promise<DeleteResult> {
        return await this.contactRepository.delete(id)
    }
}
