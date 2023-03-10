import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}
  addTask(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/add', data);
  }

  getTasks(): Observable<any> {
    return this._http.get('http://localhost:5000/api/');
  }

  deleteTask(deleteId: number): Observable<any> {
    return this._http.delete(`http://localhost:5000/api/delete/${deleteId}`);
  }

  updateTask(updateId: number): Observable<any> {
    return this._http.patch(
      `http://localhost:5000/api/update/${updateId}`,
      null //null body
    );
  }
}
