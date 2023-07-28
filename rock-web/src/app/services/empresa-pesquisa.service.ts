import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { Empresa } from 'app/modelos/empresa';
import { Coluna } from '@boom/modelos/coluna';

@Injectable()
export class EmpresaPesquisaService extends PesquisaAPIService<Empresa> {
  urlBase = 'empresa';
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}