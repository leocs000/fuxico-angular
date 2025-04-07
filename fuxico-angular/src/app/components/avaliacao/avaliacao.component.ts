import { Component, Input } from '@angular/core';
import { NgxStarsModule } from 'ngx-stars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatCard, MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-avaliacao',
  imports: [NgxStarsModule, MatFormFieldModule, MatInputModule, NgFor, MatCardModule, FormsModule, MatToolbarModule, MatDivider],
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.css'
})
export class AvaliacaoComponent {

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
  /* @Input() topicoId!: string;
  comentarios: { id: string, alunoId: string, comentario: string, estrelas: number, curtidas: number }[] = [];
  ratingDisplay!: number;
  
  onRatingSet(rating: number): void {
    if(rating != null || undefined)
      console.log(rating+'não deu certo');
    this.ratingDisplay = rating;
  }

  adicionarAvaliacao(alunoId: string, comentario: string, estrelas: string) {
    const numeroEstrelas = parseInt(estrelas, 10); // Certifique-se de usar a base decimal (10)
    if (isNaN(numeroEstrelas)) {
      console.error('Número de estrelas inválido.');
      return;
    }
  
    const novaAvaliacao = {
      id: (Math.random() * 1000).toString(),
      alunoId,
      comentario,
      estrelas: numeroEstrelas,
      curtidas: 0
    };
  
    this.comentarios.push(novaAvaliacao);
  }
  onRate(x: Event){

  }
  

  curtirAvaliacao(avaliacaoId: string) {
    const avaliacao = this.comentarios.find(c => c.id === avaliacaoId);
    if (avaliacao) {
      avaliacao.curtidas += 1;
    }
  } */
}

