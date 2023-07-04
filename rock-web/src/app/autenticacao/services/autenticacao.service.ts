import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, flatMap, tap } from 'rxjs/operators';
import { LoginInfo } from '../modelos/login-info';
import { LoginArgs } from '../modelos/login-args';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Usuario } from 'app/modelos/usuario';
import {RecuperarSenha} from '../modelos/esqueci-senha';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  primeiroAcesso = true;
  rota?: string | undefined | null;

  onLogin: EventEmitter<LoginInfo> = new EventEmitter<LoginInfo>();
  onLogout: EventEmitter<LoginInfo> = new EventEmitter<LoginInfo>();

  constructor(private router: Router, private http: HttpClient) { }

  login(loginArgs: LoginArgs): Observable<LoginInfo> {
    const url = `${environment.api}/login`;
    return this.http.post<LoginInfo>(url, loginArgs).pipe(
      flatMap(
        result => of(this.finalizarLogin(result))
      ),
      catchError(
        erro => {
          this.requererLogin('');
          const msg = erro && erro.error ? erro.error : 'Não foi possível fazer o login';
          return throwError(msg);
        }
      )
    );
  }

  finalizarLogin(loginInfo: LoginInfo): any {
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
    if (loginInfo.token) {
      localStorage.setItem('token', loginInfo.token);
      localStorage.setItem('tokenExpiration', loginInfo.tokenExpiration.toISOString());
      localStorage.setItem('tipoLogin', loginInfo.usuario.tipoAcesso!);
    }
    this.onLogin.next(this.loginInfo!);
    this.redirecionarRota();
  }

  getUsuarioLogado(): Observable<Usuario> {
    const url = `${environment.api}/usuario/logado`;
    return this.http.get<Usuario>(url);
  }

  requererLogin(rota: string) {
    this.rota = rota;
    this.router.navigate(['login']);
  }

  redirecionarRota() {
    let rota = this.rota;
    this.rota = null;
    if (!rota) {
      if (this.loginInfo?.usuario.tipoAcesso.toString() === "ADMIN_EMPRESA" || this.loginInfo?.usuario.tipoAcesso.toString() === "RH_EMPRESA") {
        rota = 'empresa';
      } else {
        rota = 'admin';
      }
    }
    this.router.navigate([rota]);
  }

  isLogado(): Observable<boolean> {
    var valido = this.authorization && this.expiration && this.expiration > new Date();
    return of(valido);
  }

  logout(): Observable<LoginInfo | any> {
    localStorage.removeItem('a');
    const rotaLogin = 'login';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.onLogout.next(this.loginInfo!);
    
    localStorage.removeItem('loginInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('tipoLogin');

    this.router.navigate([rotaLogin]);
    return of(this.loginInfo).pipe(
      delay(1000)
    );
  }

  recuperarSenha(recuperarSenha: RecuperarSenha): Observable<string> {
    const url = `${environment.api}/login/recuperar-senha`;
    return this.http.post<string>(url, recuperarSenha);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get loginInfo(): LoginInfo | undefined | null {
    var l = JSON.parse(localStorage.getItem('loginInfo'));
    if (l) return l;

    this.router.navigate(['login']);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get authorization() {
    return localStorage.getItem('token');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get expiration(): Date {
    return localStorage.getItem('tokenExpiration') != null ? new Date(localStorage.getItem('tokenExpiration')) : null;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get tipoLogin() {
    return localStorage.getItem('tipoLogin');
  }

  toBase64(dado: string): string {
    return btoa(dado);
  }
}
