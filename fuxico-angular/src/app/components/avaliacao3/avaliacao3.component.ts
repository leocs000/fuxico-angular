import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { AvaliacaoService } from '../../services/avaliacao.service';

@Component({
  selector: 'app-avaliacao3',
  imports: [NgxStarsModule, MatFormFieldModule, MatInputModule, NgFor, MatCardModule, FormsModule, MatToolbarModule, MatDivider, MatIconModule],
  templateUrl: './avaliacao3.component.html',
  styleUrl: './avaliacao3.component.css'
})
export class Avaliacao3Component {
  // Vetor de avaliações
  avaliacoes: any[] = [];
  comentario: string = '';
  itens = [
    { nome: 'Qualidade dos computadores', estrelas: 0 },
    { nome: 'Velocidade e estabilidade da internet', estrelas: 0 },
    { nome: 'Disponibilidade de projetores nas salas', estrelas: 0 },
    { nome: 'Manutenção de equipamentos', estrelas: 0 },

  ];

  constructor(private router: Router, private avaliacoesService: AvaliacaoService) {}

  uploadImage(): void {
    const fileInput = document.getElementById('upload') as HTMLElement;
    fileInput.click();
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    console.log('Imagem carregada:', file);
  }

  onRate(index: number, estrelas: number): void {
    this.itens[index].estrelas = estrelas;
    console.log(`Item ${index} avaliado com ${estrelas} estrelas`);
  }

  submitReview(): void {
    console.log('Comentário:', this.comentario);
    console.log('Itens avaliados:', this.itens);
    alert('Avaliação enviada com sucesso!');
  }


  enviarAvaliacao(): void {
    const totalEstrelas = this.itens.reduce((acc, item) => acc + item.estrelas, 0);
    const mediaEstrelas = totalEstrelas / this.itens.length;

    const novaAvaliacao = {
      nome: 'Usuário Estático',
      mediaEstrelas: mediaEstrelas,
      comentario: this.comentario,
      detalhes: this.itens.map(item => ({ nome: item.nome, estrelas: item.estrelas })),
    };

    // Adiciona a avaliação ao serviço
    this.avaliacoesService.setAvaliacoes(novaAvaliacao);

    // Redireciona para a página de agradecimento
    this.router.navigate(['/agradecimento']);
    this.comentario = '';
    this.itens.forEach(item => (item.estrelas = 0));
  }

  voltar(): void {
    this.router.navigate(['/inicio']); // Voltar para a página inicial
  }
}
