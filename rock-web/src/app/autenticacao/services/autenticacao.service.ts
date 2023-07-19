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
import { MensagemService } from '@boom/services/programa/mensagem.service';

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
    localStorage.removeItem('rockjobs-loginInfo');
    localStorage.removeItem('rockjobs-token');
    localStorage.removeItem('rockjobs-tokenExpiration');
    localStorage.removeItem('rockjobs-tipoLogin');

    const url = `${environment.api}/login`;
    return this.http.post<LoginInfo>(url, loginArgs).pipe(
      flatMap(
        result => of(this.finalizarLogin(result))
      ),
      catchError(
        erro => {
          this.requererLogin('');
          const msg = erro && typeof erro.error === 'string' ? erro.error : 'Não foi possível fazer o login';
          return throwError(msg);
        }
      )
    );
  }

  finalizarLogin(loginInfo: LoginInfo): any {
    localStorage.setItem('rockjobs-loginInfo', JSON.stringify(loginInfo));
    if (loginInfo.token) {
      localStorage.setItem('rockjobs-token', loginInfo.token);
      localStorage.setItem('rockjobs-tokenExpiration', loginInfo.tokenExpiration.toISOString());
      localStorage.setItem('rockjobs-tipoLogin', loginInfo.usuario.tipoAcesso!);
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }

  isLogado(): Observable<boolean> {
    var valido = this.authorization && this.expiration && this.expiration > new Date();
    return of(valido);
  }

  logout(): Observable<LoginInfo | any> {
    const rotaLogin = 'login';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.onLogout.next(this.loginInfo!);
    
    localStorage.removeItem('rockjobs-loginInfo');
    localStorage.removeItem('rockjobs-token');
    localStorage.removeItem('rockjobs-tokenExpiration');
    localStorage.removeItem('rockjobs-tipoLogin');

    this.router.navigate([rotaLogin]);
    window.location.reload();
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
    var l = JSON.parse(localStorage.getItem('rockjobs-loginInfo'));
    if (l) return l;

    this.router.navigate(['login']);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get authorization() {
    return localStorage.getItem('rockjobs-token');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get expiration(): Date {
    return localStorage.getItem('rockjobs-tokenExpiration') != null ? new Date(localStorage.getItem('rockjobs-tokenExpiration')) : null;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get tipoLogin() {
    return localStorage.getItem('rockjobs-tipoLogin');
  }

  toBase64(dado: string): string {
    return btoa(dado);
  }
}
