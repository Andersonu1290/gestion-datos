
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://68f13c2d0b966ad50035c824.mockapi.io/api/v1';
  private baseUrl2 = 'https://68f29a74b36f9750deed2943.mockapi.io/api/v1';
  private baseUrl3 = 'https://68f2b38efd14a9fcc426b48c.mockapi.io/api/v1';
  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alumnos`);
  }
  getAlumno(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/alumnos/${id}`);
  }
  addAlumno(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/alumnos`, data);
  }
  updateAlumno(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/alumnos/${id}`, data);
  }
  deleteAlumno(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/alumnos/${id}`);
  }


  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/libros`);
  }
  getLibro(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/libros/${id}`);
  }
  addLibro(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/libros`, data);
  }
  updateLibro(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/libros/${id}`, data);
  }
  deleteLibro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/libros/${id}`);
  }

  getAutores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/autores`);
  }
  getAutor(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/autores/${id}`);
  }
  addAutor(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl2}/autores`, data);
  }
  updateAutor(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl2}/autores/${id}`, data);
  }
  deleteAutor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl2}/autores/${id}`);
  }

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/cursos`);
  }
  getCurso(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/cursos/${id}`);
  }
  addCurso(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl2}/cursos`, data);
  }
  updateCurso(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl2}/cursos/${id}`, data);
  }
  deleteCurso(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl2}/cursos/${id}`);
  }

  getNotas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl3}/notas`);
  }
  getNota(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl3}/notas/${id}`);
  }
  addNota(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl3}/notas`, data);
  }
  updateNota(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl3}/notas/${id}`, data);
  }
  deleteNota(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl3}/notas/${id}`);
  }
}