import { NgFor, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxStarsModule } from 'ngx-stars';
import { Questionario } from '../../../models/questionario.model';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionarioService } from '../../../services/questionario.service';
import { Topicos } from '../../../models/topicos.model';
import { Avaliacao } from '../../../models/avaliacao.model';

@Component({
  selector: 'app-avaliacao-form',
  imports: [NgxStarsModule, MatFormFieldModule, MatInputModule, NgFor, MatCardModule, FormsModule, MatToolbarModule, MatDivider, MatIconModule],
  templateUrl: './avaliacao-form.component.html',
  styleUrl: './avaliacao-form.component.css'
})
export class AvaliacaoFormComponent implements OnInit{
  questionario!: Questionario;
  // Vetor de avaliações
  itens: Topicos[] = [];
  comentario: string = '';
  avaliacao!: Avaliacao;

  constructor(private formBuilder: FormBuilder,
  private avaliacaoService: AvaliacaoService,
  private questionarioService: QuestionarioService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private location: Location) {

  }

  ngOnInit(): void {
    const idQuestionario = "1"; // ou pegue da rota
    this.questionarioService.findById(idQuestionario).subscribe(data => {
      this.questionario = data;
      this.itens = data.topicos.map(topico => ({
        id: topico.id,
        nome: topico.nome,
        descricao: topico.descricao,
        estrelas: 0
      }));
    });
  }


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
    
    if(this.avaliacao == null){
      this.avaliacao = {
      id: null,
      dataAvaliacao: new Date(),
      comentario: this.comentario,
      toxicidade: 0, // pode ser atualizado depois
      visibiliadade: false,
      questionario: this.questionario,
      respostas: this.itens.map(item => ({
          id: 0,
          avaliacao: new Avaliacao,
          topico: item,
          estrela: item.estrelas,
        })) 
    };
    }
    

    if (this.avaliacao) {
      console.log(this.avaliacao);
      // selecionando a operacao (insert ou update)
      const operacao = this.avaliacao.id == null
      ? this.avaliacaoService.insert(this.avaliacao)
      : this.avaliacaoService.update(this.avaliacao);

      // executando a operacao
      operacao.subscribe({
        next: (avaliacaoCadastrada) => {
          this.router.navigateByUrl('/agradecimento');
          this.comentario = '';
          this.itens.forEach(item => (item.estrelas = 0));
        },
        error: (error) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
        }
      });
    }
  };
  


  voltar(): void {
    this.router.navigate(['/inicio']); // Voltar para a página inicial
  }

}
