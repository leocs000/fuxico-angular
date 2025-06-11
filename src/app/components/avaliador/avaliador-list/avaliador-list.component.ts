import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Avaliador } from '../../../models/avaliador.model';
import { AvaliadorService } from '../../../services/avaliador.service';

@Component({
  selector: 'app-avaliador-list',
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, 
    MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './avaliador-list.component.html',
  styleUrl: './avaliador-list.component.css'
})
export class AvaliadorListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'email', 'login', 'acao'];
  avaliadores: Avaliador[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private avaliadorService: AvaliadorService) {

  }

  ngOnInit(): void {
    this.avaliadorService.findAll(this.page, this.pageSize).subscribe(
      data => {
      this.avaliadores = data;
    });

    this.avaliadorService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }
  
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(avaliador: Avaliador) {
    if (avaliador.id != null) {
      this.avaliadorService.delete(avaliador).subscribe({
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
