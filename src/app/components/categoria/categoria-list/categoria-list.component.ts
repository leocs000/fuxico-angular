import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-list',
  imports: [MatButtonModule, RouterModule, MatIconModule, MatTableModule, 
    MatToolbarModule, MatPaginatorModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'acao']; 
  categorias: Categoria[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private categoriaService: CategoriaService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.categoriaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.categorias = data;
    });

    this.categoriaService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(categoria: Categoria) {
    if (categoria.id != null) {
      this.categoriaService.delete(categoria).subscribe({
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
