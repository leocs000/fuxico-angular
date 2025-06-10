import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { TipoAvaliador } from '../../../models/tipo-avaliador.model';
import { TipoAvaliadorService } from '../../../services/tipo-avaliador.service';

@Component({
  selector: 'app-tipo-avaliador-list',
  imports: [MatButtonModule, RouterModule, MatIconModule, MatTableModule, 
    MatToolbarModule, MatPaginatorModule],
  templateUrl: './tipo-avaliador-list.component.html',
  styleUrl: './tipo-avaliador-list.component.css'
})
export class TipoAvaliadorListComponent {
  displayedColumns: string[] = ['id', 'descricao', 'acao']; 
  tiposAvaliadores: TipoAvaliador[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private tipoAvaliadorService: TipoAvaliadorService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tipoAvaliadorService.findAll(this.page, this.pageSize).subscribe(data => {
      this.tiposAvaliadores = data;
    });

    this.tipoAvaliadorService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(tipoAvaliador: TipoAvaliador) {
    if (tipoAvaliador.id != null) {
      this.tipoAvaliadorService.delete(tipoAvaliador).subscribe({
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
