import { NgFor, NgIf, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subcategoria } from '../../../models/subcategoria.model';
import { Categoria } from '../../../models/categoria.model';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { CategoriaService } from '../../../services/categoria.service';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subcategoria-form',
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule, MatIconModule],
  templateUrl: './subcategoria-form.component.html',
  styleUrl: './subcategoria-form.component.css'
})
export class SubcategoriaFormComponent implements OnInit{
  formGroup: FormGroup;

  categorias: Categoria[] = [];

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      nome:['', Validators.required],
      categoria:[null],
    });
  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
      this.initializeForm();
    });

    
  }

  voltarPagina() {
    this.location.back();
  }

  initializeForm(): void{
    const subcategoria: Subcategoria = this.activatedRoute.snapshot.data['subcategoria'];

    const categoria = this.categorias.find(categoria => categoria.id === (subcategoria?.categoria?.id || null));

    this.formGroup = this.formBuilder.group({
      id:[(subcategoria && subcategoria.id) ? subcategoria.id : null],
      nome: [(subcategoria && subcategoria.nome) ? subcategoria.nome : '', Validators.required],
      categoria: [categoria],
      
    });
  }

  tratarErros(errorResponse: HttpErrorResponse) {

    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);

          if (formControl) {
            formControl.setErrors({apiError: validationError.message})
          }

        });
      }
    } else if (errorResponse.status < 400){
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {
      alert('Erro interno do servidor.');
    }

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const subcategoria = this.formGroup.value;

      // selecionando a operacao (insert ou update)
      const operacao = subcategoria.id == null
      ? this.subcategoriaService.insert(subcategoria)
      : this.subcategoriaService.update(subcategoria);

      // executando a operacao
      operacao.subscribe({
        next: (subcategoriaCadastrada) => {
          this.router.navigateByUrl('/subcategorias');
        },
        error: (error) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const subcategoria = this.formGroup.value;
      if (subcategoria.id != null) {
        this.subcategoriaService.delete(subcategoria).subscribe({
          next: () => {
            this.router.navigateByUrl('/subcategorias');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
