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

  login(credentials: { email: string; password: string }) {
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

  logout() {
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

  getDecodedToken(): any {
    const token = localStorage.getItem('token')
    if (!token) return null

    const helper = new JwtHelperService()
    return helper.decodeToken(token)
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken()
    return decodedToken ? decodedToken.role : null
  }

  getUserRoles(): string[] {
    const decodedToken = this.getDecodedToken()
    return decodedToken ? decodedToken.roles : []
  }

  isOwner(): boolean {
    return this.getUserRoles().includes('Owner')
  }

  isAdministrator(): boolean {
    return this.getUserRoles().includes('Administrator')
  }

  isCompany(): boolean {
    return this.getUserRoles().includes('Company')
  }

  isUser(): boolean {
    return this.getUserRoles().includes('User')
  }
}
