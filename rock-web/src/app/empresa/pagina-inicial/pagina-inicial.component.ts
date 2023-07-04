import { Component, OnInit, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { AppComponent } from 'app/app.component';

@Component({
    selector: 'app-pagina-inicial',
    templateUrl: './pagina-inicial.component.html',
    styleUrls: ['./pagina-inicial.component.css'],
    providers: [
    ]
})
export class PaginaInicialComponent extends ViewBase implements OnInit {
    contadorVendas: number = 0;
    totalVendas: number = 0;

    constructor(protected injector: Injector,
                public app: AppComponent) {
        super(injector);
        this.titulo = 'Página Inicial';
    }

    ngOnInit() {
        this.app.mostraSpinner();
        this.app.fechaSpinner();
    }
}
