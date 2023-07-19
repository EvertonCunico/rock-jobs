import { Component, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { Coluna } from '@boom/modelos/coluna';
import { FormGroup } from '@angular/forms';
import { TiposCampo } from '@boom/modelos/tipos-campo';
import { UsuarioPesquisaService } from 'app/services/usuario-pesquisa.service';
import { NavigationExtras } from '@angular/router';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';
import { Usuario } from 'app/modelos/usuario';
import { EnumUtils } from 'app/shared/utils/enum-utils';
import { RolesUser } from 'app/modelos/roles';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent extends ViewBase {
  formFiltros: FormGroup;
  colunas: Coluna[] = [
    { field: 'id', header: 'Código' },
    { field: 'nome', header: 'Nome' },
    { field: 'email', header: 'E-mail'},
    { field: 'cpf', header: 'CPF', mascara: '###.###.###-##'},
    { field: 'telefoneCelular', header: 'Telefone', mascara: '(##) #####-####'},
    { field: 'ativo', header: 'Ativo', tipo: TiposCampo.BOOLEAN}
  ];
  permissoes = [];

  pesquisado: boolean = false;

  constructor(protected injector: Injector, public usuarioPesquisaService: UsuarioPesquisaService) {
    super(injector);
    this.titulo = 'Cadastros / Usuários';
    this.formFiltros = this.criarFormularioFiltros();
    this.permissoes = EnumUtils.getLabelValueArray(RolesUser);
  }

  criarFormularioFiltros(): FormGroup {
    return this.formBuilder.group({
      nome: '',
      cpf: '',
      email: '',
      permissao: ''
    });
  }

  pesquisaConcluida(pesquisa: { requisicao: RequisicaoPesquisa, resultado: ResultadoPesquisa<Usuario> }) {
    this.pesquisado = true;
  }
}
