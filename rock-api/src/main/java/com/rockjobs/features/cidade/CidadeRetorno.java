package com.rockjobs.features.cidade;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CidadeRetorno {
	private Long id;
	private String nome;
	private String estado;
}