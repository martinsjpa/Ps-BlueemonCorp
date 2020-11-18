import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
}
