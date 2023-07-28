import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {DecryptionComponent} from '../../utils/decryption.component';

/**
 * Serviço interceptador de respostas http responsável por converter
 * as strings de datas no JSON em objetos do tipo Date
 */
@Injectable({
  providedIn: 'root'
})
export class DateInterceptorService implements HttpInterceptor {

  // Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
  iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)[UTC]?$/;
  dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)$/;
  utcDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  localDateTimeRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  localDateRegex = /\d{4}-\d{2}-\d{2}/;
  localTimeRegex = /\d{2}:\d{2}:\d{2}/;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const bodyValue = DecryptionComponent.decryptData(event.body);
          event = event.clone({ body: bodyValue });
          this.convertToDate(event);
          return event;
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
      }),
    );
  }

  convertToDate(body) {
    try {
      if (body === null || body === undefined) {
        return body;
      }
      if (typeof body !== 'object') {
        return body;
      }
      for (const key of Object.keys(body)) {
        const value = body[key];
        if (typeof value === 'object') {
          this.convertToDate(value);
        }
        if (this.isIso8601(value)) {
          let dateStr = '' + value;
          dateStr = value.slice(0, value.indexOf('[UTC]'));
          body[key] = new Date(dateStr);
        } else if (this.localDateTimeRegex.test(value)) {
          body[key] = this.localDateTimeParaDate(value);
        } else if (this.localDateRegex.test(value)) {
          body[key] = this.localDateParaDate(value)
        } else if (this.localTimeRegex.test(value)) {
          body[key] = this.localTimeParaDate(value)
        }
      }
    } catch (erro) {
      console.log(erro)
    }
  }

  localDateParaDate(value) {
    const partesData = value.split('-');
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Subtrai 1 do mês, pois os meses são indexados de 0 a 11
    const dia = parseInt(partesData[2], 10);

    return new Date(ano, mes, dia);
  }

  localTimeParaDate(value) {
    const [hour, minute, second] = value.split(':').map(Number);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    return date;
  }

  localDateTimeParaDate(value) {
    const partesDataHora = value.split('T');
    const partesData = partesDataHora[0].split('-');
    const partesHora = partesDataHora[1].split(':');
    
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Subtrai 1 do mês, pois os meses são indexados de 0 a 11
    const dia = parseInt(partesData[2], 10);
    const hora = parseInt(partesHora[0], 10);
    const minuto = parseInt(partesHora[1], 10);
    const segundo = parseInt(partesHora[2], 10);
    
    return new Date(ano, mes, dia, hora, minuto, segundo);
  }

  isIso8601(value) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    return ('' + value).endsWith('[UTC]'); // this.iso8601.test(value);
  }
}
