import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  API_URL = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  get()
  {
    return this.http.get(`${this.API_URL}/getEmployee`);
  }

  save(employee: Employee)
  {
    return this.http.post(`${this.API_URL}/saveEmployee`, employee);
  }

  delete(employeeId: any)
  {
    return this.http.delete(`${this.API_URL}/deleteEmployee/${employeeId}`);
  }

  edit(employee: Employee)
  {
    return this.http.put(`${this.API_URL}/editEmployee/${employee._id}`, employee);
  }
}
