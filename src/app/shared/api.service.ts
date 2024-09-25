import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  // Method to add a new user
  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      map((res: any) => res),
      catchError((error) => {
        console.error('Error adding user:', error);
        throw error;
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res: any) => res),
      catchError((error) => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === username && user.password === password)),
      catchError(error => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }
}
