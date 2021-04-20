import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import * as _ from 'underscore'
 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  source = "https://cutt.ly/AvhK78a";
  users :User[] = []
  pagination :any
  pages :any
  query :string = ''
  isActive :string = 'All' 


  constructor(private service : UserService) {  }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPage: 6, totalPages: 0 }
    this.populateUsers()
  }

  populateUsers() {
    this.service.get(this.pagination.currentPage, this.pagination.itemsPage, this.query, this.isActive).subscribe(
      (response: any) => {
        this.pagination.totalPages = Math.ceil((response.headers.get('X-Total-Count') / this.pagination.itemsPage))
        this.pages = _.range(1, this.pagination.totalPages + 1);
        this.users = response.body;
        this.pagination.totalElement = response.headers.get('X-Total-Count');
      }
    );
  }

  paginate(page :number) {
    this.pagination.currentPage = page
    this.populateUsers()
  }

  search(event:any) {
    this.query = event.target.value
    this.pagination.currentPage = 1
    this.populateUsers()
  }

  showActive(showActive :string) {
    this.isActive = showActive
    this.populateUsers()
  }

}
