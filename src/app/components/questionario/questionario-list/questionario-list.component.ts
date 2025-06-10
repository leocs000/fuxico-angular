import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { Subcategoria } from '../../../models/subcategoria.model';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { Questionario } from '../../../models/questionario.model';
import { QuestionarioService } from '../../../services/questionario.service';

@Component({
  selector: 'app-questionario-list',
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './questionario-list.component.html',
  styleUrl: './questionario-list.component.css'
})
export class QuestionarioListComponent {
  displayedColumns: string[] = ['subcategoria', 'titulo', 'descricao', 'status', 'dataCriacao', 'acao']; 
  questionarios: Questionario[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private questionarioService: QuestionarioService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.questionarioService.findAll(this.page, this.pageSize).subscribe(data => {
      this.questionarios = data;
    });

    this.questionarioService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(questionario: Questionario) {
    if (questionario.id != null) {
      this.questionarioService.delete(questionario).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.log("não entrou");
          console.log('Erro ao Excluir' + JSON.stringify(err));
        }
      });
    }
  }
}
