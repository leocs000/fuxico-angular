import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { AvaliacaoService } from '../../services/avaliacao.service';

@Component({
  selector: 'app-comentarios',
  imports: [NgFor, NgIf, NgxStarsModule, MatDividerModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit{
  avaliacoes: any[] = [];

  constructor(private router: Router, private avaliacoesService: AvaliacaoService) {}

  ngOnInit(): void {
    this.avaliacoes = this.avaliacoesService.getAvaliacoes();
    console.log('comentario'+this.avaliacoes);
  }

  voltar(): void {
    this.router.navigate(['/avaliacao']); // Voltar para a página inicial
  }
  
  //@Input() avaliacoes: any[] = [];

  toggleExpand(avaliacao: any): void {
    avaliacao.expanded = !avaliacao.expanded;
  }
}
