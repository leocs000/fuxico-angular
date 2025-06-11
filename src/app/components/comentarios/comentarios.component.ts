import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { Avaliacao } from '../../models/avaliacao.model';
import { NgxStarsModule } from 'ngx-stars';
import { MatDividerModule } from '@angular/material/divider';
import { Respostas } from '../../models/respostas.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: "app-comentarios",
  imports: [NgFor, NgIf, NgxStarsModule, MatDividerModule, CommonModule, MatIcon, RouterModule],
  templateUrl: "./comentarios.component.html",
  styleUrls: ["./comentarios.component.css"],
})
export class ComentariosComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];

  constructor(private router: Router, private avaliacaoService: AvaliacaoService) {}

  ngOnInit(): void {
    this.avaliacaoService.findAll().subscribe(data => {
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

  voltar(): void {
    this.router.navigate(['/avaliacoes/new']); // Voltar para a página inicial
  }

  toggleExpand(avaliacao: Avaliacao): void {
    avaliacao.expanded = !avaliacao.expanded;
  }
}





