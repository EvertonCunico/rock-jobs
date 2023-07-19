import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {CRUDAPIService} from '@boom/services/api/crud-api.service';
import { Vaga } from 'app/modelos/vaga/vaga';

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
}