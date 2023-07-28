import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Coluna } from '@boom/modelos/coluna';
import { ViewBase } from '@boom/ui/views/view-base';
import { EmpresaPesquisaService } from 'app/services/empresa-pesquisa.service';

@Component({
  selector: 'app-empresa-pesquisa',
  templateUrl: './empresa-pesquisa.component.html',
  styleUrls: ['./empresa-pesquisa.component.css']
})
export class EmpresaPesquisaComponent extends ViewBase {

  formFiltros: FormGroup;
  colunas: Coluna[] = [
    { field: 'id', header: 'Código' },
    { field: 'razaoSocial', header: 'Razão Social' },
    { field: 'email', header: 'E-mail'},
    { field: 'cnpj', header: 'CNPJ', mascara: '##.###.###/####-##'},
    { field: 'telefone', header: 'Telefone', mascara: '(##) #####-####'}
  ];

  constructor(protected injector: Injector, public empresaPesquisaService: EmpresaPesquisaService) {
    super(injector);
    this.titulo = 'Cadastros / Empresas';
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
