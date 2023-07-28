import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Coluna } from '@boom/modelos/coluna';
import { TiposCampo } from '@boom/modelos/tipos-campo';
import { ViewBase } from '@boom/ui/views/view-base';
import { VagaPesquisaService } from 'app/services/vaga/vaga-pesquisa.service';

@Component({
  selector: 'app-vaga-pesquisa',
  templateUrl: './vaga-pesquisa.component.html'
})
export class VagaPesquisaComponent extends ViewBase {
  formFiltros: FormGroup;
  colunas: Coluna[] = [
    { field: 'id', header: 'Código'},
    { field: 'empresa', header: 'Empresa', tipo: TiposCampo.OBJETO, propriedades: ['id', 'razaoSocial']},
    { field: 'nomeDaFuncao', header: 'Função'},
    { field: 'quantidadeDeVagas', header: 'Vagas'},
  ];

  constructor(protected injector: Injector, public vagaPesquisaService: VagaPesquisaService) {
    super(injector);
    this.titulo = 'Cadastros / Vagas';
    this.formFiltros = this.criarFormularioFiltros();
  }

  ngOnInit(): void {
  }

  criarFormularioFiltros(): FormGroup {
    return this.formBuilder.group({
      empresa: '',
      dataSelecao: '',
    });
  }

}
