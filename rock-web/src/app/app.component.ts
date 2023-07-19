import { Component } from '@angular/core';
import { BaseApp } from './estrutura/base-app';
import { InterfaceService } from './estrutura/services/interface.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TesteService } from '@estrutura/services/teste.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseApp {

    constructor(public interfaceService: InterfaceService,
                public testeService: TesteService,
                private router: Router,
                private spinner: NgxSpinnerService) {
        super();
        testeService.testeAPI().subscribe(() => {

        }, error => {
            router.navigate(['login']);
        });
    }

    mostraSpinner() {
        this.spinner.show();
    }

    fechaSpinner() {
        this.spinner.hide();
    }
}
