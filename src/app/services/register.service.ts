import { Router } from '@angular/router';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../config';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private router: Router, private http: HttpClient) {}

  register(user: { name: string; lastName: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
}
