import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { Vaga } from 'app/modelos/vaga/vaga';

@Injectable()
export class VagaPesquisaService extends PesquisaAPIService<Vaga> {
  urlBase = 'vaga';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}