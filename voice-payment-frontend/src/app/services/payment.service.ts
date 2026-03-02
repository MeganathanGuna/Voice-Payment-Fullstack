import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {}

  makePayment(userId: number, person: string, amount: number, password: string) {
    return this.http.post(this.baseUrl, null, {
      params: {
        userId: userId.toString(),
        person,
        amount: amount.toString(),
        password
      }
    });
  }

  getTransactions(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/history/${userId}`);
  }

  addMoney(userId: number, amount: number) {
  return this.http.post(`${this.baseUrl}/add-money`, null, {
    params: {
      userId: userId.toString(),
      amount: amount.toString()
    }
  });
}
}
