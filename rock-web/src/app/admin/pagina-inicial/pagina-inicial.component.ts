import { Component, OnInit, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { AppComponent } from 'app/app.component';
import { VagaCRUDService } from 'app/services/vaga/vaga-crud.service';

@Component({
    selector: 'app-pagina-inicial',
    templateUrl: './pagina-inicial.component.html',
    styleUrls: ['./pagina-inicial.component.css'],
    providers: [VagaCRUDService]
})
export class PaginaInicialComponent extends ViewBase implements OnInit {
    contadorVagasAtivas: number = 0;

    constructor(protected injector: Injector,
                protected vagaCrudService: VagaCRUDService,
                public app: AppComponent) {
        super(injector);
        this.titulo = 'Página Inicial';
    }

    ngOnInit() {
        this.vagaCrudService.contadorVagasAtivas(null).subscribe(val => {
            this.contadorVagasAtivas = val;
        });
    }
}
