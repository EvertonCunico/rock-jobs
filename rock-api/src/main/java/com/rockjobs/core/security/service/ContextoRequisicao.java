package com.rockjobs.core.security.service;

import lombok.Getter;
import lombok.Setter;

import javax.enterprise.context.RequestScoped;

@Getter
@Setter
@RequestScoped
public class ContextoRequisicao {
    private String payloadJson;
}
