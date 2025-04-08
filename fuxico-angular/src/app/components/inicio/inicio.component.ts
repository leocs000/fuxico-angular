import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-inicio',
  imports: [MatButtonModule, MatListModule, MatToolbarModule, MatCardModule, MatExpansionModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  subcategorias1 = [
    { nome: 'Subcategoria 1.1' },
    { nome: 'Subcategoria 1.2' },
  ];

  subcategorias2 = [
    { nome: 'Subcategoria 2.1' },
    { nome: 'Subcategoria 2.2' },
  ];

  voltar() {
    console.log('Voltar ao início');
  }

  selecionarSubcategoria(subcategoria: any) {
    console.log('Subcategoria selecionada:', subcategoria.nome);
  }
}
