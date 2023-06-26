import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Coluna } from '@boom/modelos/coluna';
import { ViewBase } from '@boom/ui/views/view-base';
import { ClientePesquisaService } from 'app/services/cliente-pesquisa.service';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css']
})
export class ClientePesquisaComponent extends ViewBase {

  formFiltros: FormGroup;
  colunas: Coluna[] = [
    { field: 'id', header: 'Código' },
    { field: 'razaoSocial', header: 'Razão Social' },
    { field: 'email', header: 'E-mail'},
    { field: 'cnpj', header: 'CPF', mascara: '##.###.###/####-##'},
    { field: 'telefone', header: 'Telefone', mascara: '(##) #####-####'}
  ];

  constructor(protected injector: Injector, public clientePesquisaService: ClientePesquisaService) {
    super(injector);
    this.titulo = 'Cadastros / Clientes';
    this.formFiltros = this.criarFormularioFiltros();
  }

  ngOnInit(): void {
  }

  criarFormularioFiltros(): FormGroup {
    return this.formBuilder.group({
      cnpj: '',
      telefone: '',
      email: ''
    });
  }

}
