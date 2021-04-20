import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string = 'http://localhost:3000/user/'

  constructor(private http : HttpClient) { }

  get(page :number, limit :number, search :string, isActive :string) {
    let source = this.url + '?_page=' + page + '&limit=' + limit + '&q=' + search 

    if(isActive == 'true' || isActive == 'false') source += '&isActive=' + isActive
    
    return this.http.get<User[]>(source, {observe : 'response'})
  }

  create(user : User) {
    return this.http.post(this.url, user)
  }

  update(user : User) {
    return this.http.put(this.url + user.id, user)
  }

  delete(user : User) {
    return this.http.delete(this.url + user.id)
  }
}
