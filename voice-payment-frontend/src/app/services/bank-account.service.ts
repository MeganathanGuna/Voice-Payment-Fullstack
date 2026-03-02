import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BankAccountService {

  baseUrl = 'http://localhost:8080/api/bank';

  constructor(private http: HttpClient) {}

  getAccounts(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }

  addAccount(userId: number, data: any) {
    return this.http.post(`${this.baseUrl}?userId=${userId}`, data);
  }
}
