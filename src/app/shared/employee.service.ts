import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

const headerOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  empData:any = []
  presentUser: Employee = null
  isUser: Subject<boolean> = new Subject<boolean>();
  demoUrl = 'http://localhost:3000/Employees'

  constructor(private http: HttpClient, private router: Router) { 
    this.isUser.next(false)
   }

  getAllEmployees():Observable<Employee[]> {
    this.setData();
    return this.http.get<Employee[]>(this.demoUrl, headerOptions)
  }

  setData() {
    this.http.get(this.demoUrl, headerOptions).subscribe(data => {
      this.empData = data;
    })
  }

  userLogin(email, password) {
    this.getAllEmployees().subscribe(data => {
      data.forEach(user => {
        if(user.email === email) {
          if(user.password === password) {
            this.presentUser = user
            localStorage.setItem('presentUser', JSON.stringify(user));
            this.isUser.next(true)
            if(user.role === 'admin') {
              this.router.navigate(['/dashboard'])
            } else {
              this.router.navigate(['/emp-dashboard'])
            }
          } 
        }
      });
      if(!this.presentUser) {
        alert('Wrong Credentials!!')
      }
    });
  }

  getPresentUser() {
    if(JSON.parse(localStorage.getItem('presentUser'))) {
      return this.getSingleUser(JSON.parse(localStorage.getItem('presentUser')).id)
    } else {
      return null
    }
  }

  getSingleUser(id) {
    return this.http.get(`${this.demoUrl}/${id}`, headerOptions)
  }

  addEmployee(data) {
    return this.http.post(this.demoUrl, data, headerOptions)
  }

  updateEmployee(data) {
    return this.http.put(`${this.demoUrl}/${data.id}`, data, headerOptions)
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.demoUrl}/${id}`, headerOptions)
  }

  logout() {
    this.presentUser = null
    localStorage.setItem('presentUser', '');
    this.router.navigate(['/login'])
    this.isUser.next(false)
  }
}
