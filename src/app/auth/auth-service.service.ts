import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData, LoginData } from './authdata.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  token: string;
  isAuthenticated = false;
  tokenTimer;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  register(firstName: string, lastName: string, email: string, password: string) {
    const authData: AuthData = {firstName: firstName, lastName: lastName, email: email, password: password}
    this.http.post('http://localhost:3000/user/register', authData)
      .subscribe(response => {
        console.log(response)
      })
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  login(email: string, password: string) {
    const loginData: LoginData = {email: email, password: password}
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/user/login', loginData)
      .subscribe(response => {
        const token = response.token
        this.token = token
        if(token) {
          const expiryDuration = response.expiresIn
          this.setAuthTimer(expiryDuration)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiryDuration * 3000)
          this.isAuthenticated = true;
          this.saveAuthData(token, expirationDate, this.isAuthenticated)
          this.authStatusListener.next(true)
          this.router.navigate(['/'])
        }
      })
  }

  getToken() {
    return this.token
  }

  autoAuthUser() {
    const authInfo = this.getAuthData()
    if(!authInfo) {
      return;
    }
    const now = new Date()
    const expiresIn = now.getTime() - authInfo.expirationDate.getTime()
    console.log(expiresIn)
    if(expiresIn > 0) {
    this.token = authInfo.token
    console.log(authInfo)
    
    this.setAuthTimer(expiresIn / 1000)
    this.isAuthenticated = authInfo.isAuthenticated == 'true' ? true : false;
    this.authStatusListener.next(true)
    this.saveAuthData(this.token, authInfo.expirationDate, this.isAuthenticated)
    }
  }


  public saveAuthData(token: string, expirationDate: Date, isAuthenticated: boolean ) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiresIn', expirationDate.toISOString())
    localStorage.setItem('isAuthenticated', 'true')
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('isAuthenticated')
  }

  setAuthTimer(duration: number) {
    console.log('duration ' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if(!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      isAuthenticated: isAuthenticated
      
    }
  }

  logout() {
    this.token = null
    this.isAuthenticated = false;
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
  }
}
