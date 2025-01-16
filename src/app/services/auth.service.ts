import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7115/api/v1'
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenValid())

  constructor(private http: HttpClient, private router: Router) {}

  async login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token)
        this.loggedIn.next(true)
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        alert('Login inválido')
      },
    })
  }

  async logout() {
    localStorage.removeItem('token')
    this.loggedIn.next(false)
    this.router.navigate(['/'])
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token')
    if (!token) return false

    const helper = new JwtHelperService()
    return !helper.isTokenExpired(token)
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable()
  }

  async getDecodedToken(): Promise<any> {
    const token = localStorage.getItem('token')
    if (!token) return null

    const helper = new JwtHelperService()
    return helper.decodeToken(token)
  }

  async getUserRoles(): Promise<string[]> {
    const decodedToken = await this.getDecodedToken()
    const roles = decodedToken ? decodedToken.role : []
    return roles ? roles : []
  }

  async isOwner(): Promise<boolean> {
    const roles = await this.getUserRoles()
    return roles.includes('Owner')
  }

  async isAdministrator(): Promise<boolean> {
    const roles = await this.getUserRoles()
    return roles.includes('Administrator')
  }

  async isCompany(): Promise<boolean> {
    const roles = await this.getUserRoles()
    return roles.includes('Company')
  }

  async isUser(): Promise<boolean> {
    const roles = await this.getUserRoles()
    return roles.includes('User')
  }

  async hasRole(role: string): Promise<boolean> {
    const roles = await this.getUserRoles()
    return roles.includes(role)
  }
}
