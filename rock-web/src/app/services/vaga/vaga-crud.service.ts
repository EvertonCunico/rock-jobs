import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {CRUDAPIService} from '@boom/services/api/crud-api.service';
import { Vaga } from 'app/modelos/vaga/vaga';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class VagaCRUDService extends CRUDAPIService<Vaga> {
    urlBase = 'vaga';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    novo(args?: any): Observable<Vaga> {
        return of({} as Vaga);
    }

    put(registro: Vaga): Observable<Vaga> {
        let object: any;
        object = registro;
        return super.put(object);
    }

    post(registro: Vaga): Observable<Vaga> {
        let object: any;
        object = registro;
        return super.post(object);
    }

    contadorVagasAtivas(empresa: any) {
        const url = `${environment.api}/` + this.urlBase + `/buscar-vagas-ativas`;
        const options = {
            params: new HttpParams().set('empresa', empresa)
        };
        return this.httpClient.get<any>(url, options).pipe(
            tap(
                resultado => {
                    return of(resultado);
                }
            )
        );
    }
}