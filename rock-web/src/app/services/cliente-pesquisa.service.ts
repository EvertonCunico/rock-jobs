import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { Cliente } from 'app/modelos/cliente';
import { Coluna } from '@boom/modelos/coluna';

@Injectable()
export class ClientePesquisaService extends PesquisaAPIService<Cliente> {
  urlBase = 'cliente';
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}