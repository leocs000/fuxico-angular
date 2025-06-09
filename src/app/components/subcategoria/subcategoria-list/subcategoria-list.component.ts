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

@Component({
  selector: 'app-subcategoria-list',
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './subcategoria-list.component.html',
  styleUrl: './subcategoria-list.component.css'
})
export class SubcategoriaListComponent {
  displayedColumns: string[] = ['id', 'nome', 'categoria', 'acao']; 
  subcategorias: Subcategoria[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private subcategoriaService: SubcategoriaService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subcategoriaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.subcategorias = data;
    });

    this.subcategoriaService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(subcategoria: Subcategoria) {
    if (subcategoria.id != null) {
      this.subcategoriaService.delete(subcategoria).subscribe({
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
