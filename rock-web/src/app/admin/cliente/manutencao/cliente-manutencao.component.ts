import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ManutencaoViewBase } from '@boom/ui/views/manutencao-view-base';
import { AreaDeAtuacao, Cliente, NumeroClientes, RamoDeAtuacao } from 'app/modelos/cliente';
import { ClienteCRUDService } from 'app/services/cliente-crud.service';
import { EnumUtils } from 'app/shared/utils/enum-utils';
import { MessageService } from 'primeng';

@Component({
  selector: 'app-cliente-manutencao',
  templateUrl: './cliente-manutencao.component.html',
  styleUrls: ['./cliente-manutencao.component.css']
})
export class ClienteManutencaoComponent extends ManutencaoViewBase<Cliente> implements OnInit {

  optionsNumeroDeColaboradores = [];
  optionsAreaAtuacao = [];
  optionsRamoAtuacao = [];

  constructor(
    protected injector: Injector,
    public clienteCRUDService: ClienteCRUDService,
    private messageService: MessageService) {
      super(injector, clienteCRUDService);
      this.titulo = "Cadastros / Cliente";
      this.form = this.formBuilder.group({
        razaoSocial: ["", [Validators.required, Validators.maxLength(255)]],
        nomeFantasia: ["", [Validators.required, Validators.maxLength(255)]],
        cnpj: ["", [Validators.required, Validators.maxLength(14)]],
        inscricaoEstadual: ["", [Validators.maxLength(20)]],
        telefone: ["", [Validators.maxLength(20)]],
        email: ["", [Validators.required, Validators.maxLength(100)]],
        endereco: ["", [Validators.maxLength(255)]],
        enderecoNumero: ["", [Validators.maxLength(20)]],
        enderecoBairro: ["", [Validators.maxLength(100)]],
        enderecoCep: ["", [Validators.maxLength(8)]],
        cidade: "",
        numeroDeColaboradores: "",
        areaDeAtuacao: "",
        ramoDeAtuacao: "",
        responsavelRH: "",
        telefoneResponsavelRH: "",
      });
    }

  ngOnInit(): void {
    this.optionsNumeroDeColaboradores = EnumUtils.getLabelValueArray(NumeroClientes);
    this.optionsAreaAtuacao = EnumUtils.getLabelValueArray(AreaDeAtuacao);
    this.optionsRamoAtuacao = EnumUtils.getLabelValueArray(RamoDeAtuacao);
    
    super.ngOnInit();
  }

}
