import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {CRUDAPIService} from '@boom/services/api/crud-api.service';
import { Empresa } from 'app/modelos/empresa';

@Injectable()
export class EmpresaCRUDService extends CRUDAPIService<Empresa> {
    urlBase = 'empresa';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    novo(args?: any): Observable<Empresa> {
        return of({} as Empresa);
    }

    put(registro: Empresa): Observable<Empresa> {
        let object: any;
        object = registro;
        return super.put(object);
    }

    post(registro: Empresa): Observable<Empresa> {
        let object: any;
        object = registro;
        return super.post(object);
    }
}