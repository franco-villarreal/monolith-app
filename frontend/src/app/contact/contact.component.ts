import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'title',
    'email',
    'phone',
    'address',
    'city',
    'actions',
  ];
  dataSource: Contact[] = [];
  contact: Contact = {} as Contact;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.readContacts().subscribe((result) => {
      this.dataSource = result;
    });
  }

  selectContact(contact: Contact) {
    this.contact = contact;
  }

  newContact() {
    this.contact = {} as Contact;
  }

  createContact(f: any) {
    console.log('Creating contact...');
    this.apiService.createContact(f.value).subscribe((result) => {
      console.log(result);
    });
  }

  deleteContact(id: number) {
    this.apiService.deleteContact(id).subscribe((result) => {
      console.log(result);
    });
  }

  updateContact(f: any) {
    f.value.id = this.contact['id'];
    this.apiService.updateContact(f.value).subscribe((result) => {
      console.log(result);
    });
  }
}
