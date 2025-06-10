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
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { Subcategoria } from '../../../models/subcategoria.model';
import { TopicoService } from '../../../services/topico.service';

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
  subcategorias: Subcategoria[] = [];

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private questionarioService: QuestionarioService,
    private subcategoriaService: SubcategoriaService,
    private topicoService: TopicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      titulo: ['', Validators.required],
      descricao: [''],
      status: [false],
      dataCriacao: [new Date()],
      subcategoria: [null, Validators.required],
      topicos: this.formBuilder.array([])
    });

  }

  ngOnInit(): void {
    this.subcategoriaService.findAll().subscribe(data => {
      this.subcategorias = data;
      this.initializeForm();
    });

    
  }


  criarTopico(): FormGroup {
    return this.formBuilder.group({
      id:[null],
      nome: ['', Validators.required],
      descricao: [''],
      estrelas: [0],
      idQuestionario: [null]
    });
  }

  removerTopico(index: number): void {
    const questionario = this.formGroup.value;
    const topicoFormGroup = this.topicos.at(index);
    const id = topicoFormGroup.get('id')?.value;

    if (id) {
      this.topicoService.delete(id).subscribe({
        next: () => {
          this.topicos.removeAt(index); // remove visualmente
        },
        error: err => {
          console.error('Erro ao excluir tópico:', err);
        }
      });
    } else {
      // Se não tem id, é um tópico novo que ainda não foi salvo
      this.topicos.removeAt(index);
    }
  }


  get topicos() {
    return this.formGroup.get('topicos') as FormArray;
  }


  voltarPagina() {
    this.location.back();
  }

  initializeForm(): void {
    const questionario: Questionario = this.activatedRoute.snapshot.data['questionario'];

    // Busca a subcategoria correspondente (caso esteja vindo do resolver)
    const subcategoria = this.subcategorias.find(
      s => s.id === questionario?.subcategoria?.id
    );

    // Preenche os campos principais do formulário (sem recriar o formGroup)
    this.formGroup.patchValue({
      id: questionario?.id ?? null,
      titulo: questionario?.titulo ?? '',
      descricao: questionario?.descricao ?? '',
      status: questionario?.status ?? false,
      dataCriacao: questionario?.dataCriacao ?? new Date(),
      subcategoria: subcategoria ?? null
    });

    // Preenche os tópicos existentes no FormArray
    if (questionario?.topicos?.length) {
      questionario.topicos.forEach(t => {
        this.topicos.push(this.formBuilder.group({
          id: [t.id],
          nome: [t.nome ?? '', Validators.required],
          descricao: [t.descricao ?? ''],
          estrelas: [t.estrelas ?? 0],
          idQuestionario: [questionario.id]
        }));
      });
    }
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
      console.log(questionario);
      // selecionando a operacao (insert ou update)
      const operacao = questionario.id == null
      ? this.questionarioService.insert(questionario)
      : this.questionarioService.update(questionario);

      // executando a operacao
      operacao.subscribe({
        next: (questionarioCadastrada) => {
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
