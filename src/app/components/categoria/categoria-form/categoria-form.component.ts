import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-categoria-form',
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      nome:[' ', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    const categoria: Categoria = this.activatedRoute.snapshot.data['categoria'];
    console.log(categoria);

    this.formGroup = this.formBuilder.group({
      id:[(categoria && categoria.id) ? categoria.id : null],
      nome: [(categoria && categoria.nome) ? categoria.nome : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id == null) {
        console.log("entrou no new");
        this.categoriaService.insert(categoria).subscribe({
          next: (grupoCadastrado) => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.categoriaService.update(categoria).subscribe({
          next: (acabamentoAlterado) => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id != null) {
        this.categoriaService.delete(categoria).subscribe({
          next: () => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
