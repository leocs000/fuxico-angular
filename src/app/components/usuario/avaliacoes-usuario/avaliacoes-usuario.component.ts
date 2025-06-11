import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { Avaliacao } from '../../../models/avaliacao.model';
import { NgxStarsModule } from 'ngx-stars';
import { Respostas } from '../../../models/respostas.model';


@Component({
  selector: 'app-avaliacoes-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatBadgeModule,
    RouterModule,
    NgxStarsModule,
    NgFor
  ],
  templateUrl: './avaliacoes-usuario.component.html',
  styleUrls: ['./avaliacoes-usuario.component.css']
})
export class AvaliacoesUsuarioComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];


  constructor(private router: Router, private avaliacaoService: AvaliacaoService) {}

  ngOnInit(): void {
    this.avaliacaoService.findAll().subscribe(data => {
      this.avaliacoes = data.map(avaliacao => ({
        ...avaliacao,
        expanded: false,
        mediaEstrelas: this.calcularMediaEstrelas(avaliacao.respostas)
      }));
    });
  }

  calcularMediaEstrelas(respostas: Respostas[]): number {
    const totalEstrelas = respostas.reduce((sum, resposta) => sum + resposta.estrela, 0);
    return respostas.length ? totalEstrelas / respostas.length : 0;
  }
  
  calcularProgresso(avaliacao: Avaliacao): number {
    if (avaliacao.pontuacao && avaliacao.totalPontos) {
      return (avaliacao.pontuacao / avaliacao.totalPontos) * 100;
    }
    return 0;
  }
  
  formatarData(data: Date): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'EM_ANDAMENTO': return 'status-em-andamento';
      case 'CONCLUIDA': return 'status-concluida';
      default: return '';
    }
  }
  
  getStatusLabel(status: string): string {
    switch (status) {
      case 'EM_ANDAMENTO': return 'Em andamento';
      case 'CONCLUIDA': return 'Concluída';
      default: return status;
    }
  }
  
  continuarAvaliacao(id?: number): void {
    // Implementar navegação para continuar a avaliação
    console.log(`Continuar avaliação ${id}`);
  }
  
  verDetalhes(id: number): void {
    // Implementar navegação para ver detalhes da avaliação
    console.log(`Ver detalhes da avaliação ${id}`);
  }
  toggleExpand(avaliacao: Avaliacao): void {
    avaliacao.expanded = !avaliacao.expanded;
  }
}
