import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../_model/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  encuestaCambio = new Subject<any>();
  mensajeCambio = new Subject<string>();
  pageRows = new Subject<number>();

  url: string = `${HOST_BACKEND}/api/encuestas`;
  //url: string = `https://zj1s896pui.execute-api.us-east-1.amazonaws.com/prod/api/encuesta`;

  //mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  listarTodos() {
    return this.httpClient.get<Encuesta[]>(`${this.url}`);
  }

  listarTodosPaginado(page: number, size: number) {
    return this.httpClient.get<Encuesta[]>(`${this.url}?page=${page}&size=${size}`);
  }

  listarPorId(id: number) {
    return this.httpClient.get<Encuesta>(`${this.url}/${id}`);
  }

  registrar(data: Encuesta) {
    return this.httpClient.post(`${this.url}`, data);
  }

  modificar(data: Encuesta) {
    return this.httpClient.put(`${this.url}`, data);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
