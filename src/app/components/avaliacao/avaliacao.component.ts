import { Component, Input } from '@angular/core';
import { NgxStarsModule } from 'ngx-stars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatCard, MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { Router } from '@angular/router';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avaliacao',
  imports: [NgxStarsModule, MatFormFieldModule, MatInputModule, NgFor, MatCardModule, FormsModule, MatToolbarModule, MatDivider, MatIconModule],
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.css'
})
export class AvaliacaoComponent {
  // Vetor de avaliações
  avaliacoes: any[] = [];
  comentario: string = '';
  itens = [
    { nome: 'Condição das carteiras e cadeiras', estrelas: 0 },
    { nome: 'Qualidade dos quadros', estrelas: 0 },
    { nome: 'Ventilação ou climatização', estrelas: 0 },
    { nome: 'Iluminação', estrelas: 0 },
    { nome: 'Estado das paredes e pintura', estrelas: 0 },
    { nome: 'Organização', estrelas: 0 },
    { nome: 'Limpeza', estrelas: 0 },
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

