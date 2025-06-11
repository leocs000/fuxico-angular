import { Component } from '@angular/core';
import { AvaliadorService } from '../../../services/avaliador.service';
import { Avaliador } from '../../../models/avaliador.model';
import { Avaliacao } from '../../../models/avaliacao.model';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor, CommonModule, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';
import { Respostas } from '../../../models/respostas.model';

@Component({
  selector: 'app-perfil',
  imports: [NgFor, NgIf, NgxStarsModule, MatDividerModule, CommonModule, MatIcon, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  avaliador!: Avaliador;
  avaliacoes: Avaliacao[] = [];

  constructor(private avaliadorService: AvaliadorService,
      private avaliacaoService: AvaliacaoService,
      private route: Router
  ) {}

  ngOnInit(): void {
    this.avaliadorService.findDadosPessoais().subscribe(data => {
      this.avaliador = data;
    });

    this.avaliacaoService.minhasAvaliacoes().subscribe(data => {
      this.avaliacoes = data.map(avaliacao => ({
        ...avaliacao,
        expanded: false,
        mediaEstrelas: this.calcularMediaEstrelas(avaliacao.respostas),
        nivelToxicidade: this.definirNivelToxicidade(avaliacao.toxicidade)
      }));
    });
  }

  calcularMediaEstrelas(respostas: Respostas[]): number {
    const totalEstrelas = respostas.reduce((sum, resposta) => sum + resposta.estrela, 0);
    return respostas.length ? totalEstrelas / respostas.length : 0;
  }

  definirNivelToxicidade(toxicidade: number): string {
    if (toxicidade <= 0.25) {
      return 'baixo';
    } else if (toxicidade <= 0.5) {
      return 'moderado';
    } else if (toxicidade <= 0.75) {
      return 'alto';
    } else {
      return 'muito-alto';
    }
  }

  toggleExpand(avaliacao: Avaliacao): void {
    avaliacao.expanded = !avaliacao.expanded;
  }

  editarSenha(): void {
    this.route.navigateByUrl('/user/alterarsenha')
    console.log('Editar Senha');
  }
}
