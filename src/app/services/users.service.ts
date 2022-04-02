import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../api/endpoints';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post(ENDPOINTS.ADD_USER, user);
  }

  getUsers() {
    return this.http.get(ENDPOINTS.GET_USERS);
  }
}
