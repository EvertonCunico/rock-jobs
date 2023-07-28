import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {MenuService} from './app.menu.service';
import {AutenticacaoService} from 'app/autenticacao/services/autenticacao.service';
import {LoginInfo} from 'app/autenticacao/modelos/login-info';
import { RolesUser } from 'app/modelos/roles';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {
    model: any[];
    idEmpresa: any;
    perfil: RolesUser;

    constructor(public app: AppComponent,
                private autenticacaoService: AutenticacaoService,
                private menuService: MenuService,
                ) {
        this.observarLogin();
    }

    ngOnInit() {
    }

    observarLogin() {
        if (this.autenticacaoService.authorization) {
            if (this.autenticacaoService.loginInfo.usuario.tipoAcesso.toString() === "ADMIN_GERAL") {
                this.model = this.getMenuAdmin();
            } else if (this.autenticacaoService.loginInfo.usuario.tipoAcesso.toString() === "ADMIN_EMPRESA") {
                this.model = this.getMenuEmpresa();
                this.perfil = this.autenticacaoService.loginInfo.usuario.tipoAcesso;
            } else {
                this.model = this.getMenuRH();
                this.perfil = this.autenticacaoService.loginInfo.usuario.tipoAcesso;
            }
        } else {
            this.autenticacaoService.onLogin.subscribe(
                (loginInfo: LoginInfo) => {
                    if (loginInfo.usuario.tipoAcesso.toString() === "ADMIN_GERAL") {
                        this.model = this.getMenuAdmin();
                    } else {
                        this.model = this.getMenuEmpresa();
                        this.perfil = loginInfo.usuario.tipoAcesso;
                    }
                }
            );
        }
        
    }

    getMenuAdmin(): any[] {
        return [
            { label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/admin/pagina-inicial' },
            {
                label: 'Cadastros',
                icon: 'fa-light fa-table-tree',
                items: [
                    { label: 'Empresas', icon: 'fa-light fa-building', routerLink: '/admin/empresa/'},
                    { label: 'Usuários', icon: 'fa-light fa-users', routerLink: '/admin/usuario/'},
                ]
            },
            { label: 'Vagas', icon: 'fa-light fa-address-card', routerLink: '/admin/vaga/'},
        ];
    }

    getMenuEmpresa(): any[] {
        return [
            { label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/empresa/pagina-inicial' },
            { label: 'Usuários', icon: 'fa-light fa-users', routerLink: '/empresa/usuario/'},
            { label: 'Vagas', icon: 'fa-light fa-address-card', routerLink: '/empresa/vaga/'},
        ];
    }

    getMenuRH(): any[] {
        return [
            { label: 'Vagas', icon: 'fa-light fa-address-card', routerLink: '/empresa/vaga/'},
        ];
    }

    getFuncaoAcao(acao: string) {
        return () => this.menuService.acao(acao);
    }
}
