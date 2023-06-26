import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {CRUDAPIService} from '@boom/services/api/crud-api.service';
import { Cliente } from 'app/modelos/cliente';

@Injectable()
export class ClienteCRUDService extends CRUDAPIService<Cliente> {
    urlBase = 'cliente';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    novo(args?: any): Observable<Cliente> {
        return of({} as Cliente);
    }

    put(registro: Cliente): Observable<Cliente> {
        let object: any;
        object = registro;
        return super.put(object);
    }

    post(registro: Cliente): Observable<Cliente> {
        let object: any;
        object = registro;
        return super.post(object);
    }
}