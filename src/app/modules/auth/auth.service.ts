import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkInitialAuthentication());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userKey = 'registeredUsers';

  constructor(private router: Router) {
    console.log('AuthService initialized');
    if (!localStorage.getItem(this.userKey)) {
      localStorage.setItem(this.userKey, JSON.stringify([]));
    }
  }

  private checkInitialAuthentication(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  register(username: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.userKey)!);
    const userExists = users.find(user => user.username === username);

    if (userExists) {
      return false;
    }

    users.push({ username, password });
    localStorage.setItem(this.userKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.userKey)!);
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
