import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  heroesUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  config: Config = {
    heroesUrl: 'http://localhost:3000/posts',
  };

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(this.config.heroesUrl);
  }

  getOneUser(id: any) {
    return this.http.get(`${this.config.heroesUrl}/${id}`);
  }

  addUser(data: any) {
    return this.http.post(this.config.heroesUrl, data);
  }

  updateUser(id: any, data: any) {
    return this.http.put(`${this.config.heroesUrl}/${id}`, data);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.config.heroesUrl}/${id}`);
  }
}
