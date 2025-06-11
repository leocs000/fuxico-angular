import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { QuestionarioService } from '../../services/questionario.service';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-inicio',
  imports: [
  CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,MatExpansionModule,RouterModule
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  categorias: any[] = [];

  constructor(private http: HttpClient,
          private questionarioService: QuestionarioService) {

          }

  ngOnInit(): void {
   this.questionarioService.findAll().subscribe(data => {
      this.categorias = this.agruparPorCategoriaESubcategoria(data);
    });
    setTimeout(() => {
      this.accordion.openAll(); // Abre todos os painéis após renderização
    });
  }

  agruparPorCategoriaESubcategoria(avaliacoes: any[]): any[] {
    const categoriasMap = new Map<string, any>();

    avaliacoes.forEach(avaliacao => {
      const categoriaNome = avaliacao.subcategoria.categoria.nome;
      const subcategoriaNome = avaliacao.subcategoria.nome;
      const questionarioNome = avaliacao.titulo;

      if (!categoriasMap.has(categoriaNome)) {
        categoriasMap.set(categoriaNome, { nome: categoriaNome, subcategorias: new Map<string, any>() });
      }

      const categoria = categoriasMap.get(categoriaNome);

      if (!categoria.subcategorias.has(subcategoriaNome)) {
        categoria.subcategorias.set(subcategoriaNome, { nome: subcategoriaNome, questionarios: [] });
      }

      const subcategoria = categoria.subcategorias.get(subcategoriaNome);
      subcategoria.questionarios.push({ nome: questionarioNome, id: avaliacao.id });
    });

    return Array.from(categoriasMap.values()).map(categoria => ({
      ...categoria,
      subcategorias: Array.from(categoria.subcategorias.values())
    }));
  }
}


