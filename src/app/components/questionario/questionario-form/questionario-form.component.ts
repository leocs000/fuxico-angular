import { NgIf, NgFor, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Questionario } from '../../../models/questionario.model';
import { QuestionarioService } from '../../../services/questionario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-questionario-form',
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule, MatIconModule],
  templateUrl: './questionario-form.component.html',
  styleUrl: './questionario-form.component.css'
})
export class QuestionarioFormComponent implements OnInit{
  formGroup: FormGroup;

  questionarios: Questionario[] = [];

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private questionarioService: QuestionarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: [''],
      status: [false],
      dataCriacao: [new Date()],
      subcategoria: [1, Validators.required],
      topicos: this.formBuilder.array([])
    });

  }

  ngOnInit(): void {
    //this.categoriaService.findAll().subscribe(data => {
    //  this.categorias = data;
    //  this.initializeForm();
    //});

    
  }

  criarTopico(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      estrelas: [0],
      idQuestionario: [null]
    });
  }

  get topicos() {
    return this.formGroup.get('topicos') as FormArray;
  }


  voltarPagina() {
    this.location.back();
  }

  initializeForm(): void{
    //const subcategoria: Questionario = this.activatedRoute.snapshot.data['questionario'];

    //const categoria = this.categorias.find(categoria => categoria.id === (subcategoria?.categoria?.id || null));

    //this.formGroup = this.formBuilder.group({
      //id:[(subcategoria && subcategoria.id) ? subcategoria.id : null],
      //nome: [(subcategoria && subcategoria.nome) ? subcategoria.nome : '', Validators.required],
      //categoria: [categoria],
      
    //});
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
      const questionario = this.formGroup.value;

      // selecionando a operacao (insert ou update)
      const operacao = questionario.id == null
      ? this.questionarioService.insert(questionario)
      : this.questionarioService.update(questionario);

      // executando a operacao
      operacao.subscribe({
        next: (armaCadastrada) => {
          this.router.navigateByUrl('/questionarios');
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
      const questionario = this.formGroup.value;
      if (questionario.id != null) {
        this.questionarioService.delete(questionario).subscribe({
          next: () => {
            this.router.navigateByUrl('/questionarios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
