import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Empresa, RespostaApi } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'https://fakerapi.it/api/v2/companies?_quantity=50';

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<RespostaApi>(this.apiUrl).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Erro ao carregar as empresas:', error);
        return throwError(() => new Error('Erro ao carregar as empresas.'));
      })
    );
  }
}
