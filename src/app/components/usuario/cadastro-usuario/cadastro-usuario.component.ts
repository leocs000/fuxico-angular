import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatStepperModule } from '@angular/material/stepper';
import { TipoAvaliadorService } from '../../../services/tipo-avaliador.service';
import { TipoAvaliador } from '../../../models/tipo-avaliador.model';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { AvaliadorService } from '../../../services/avaliador.service';


@Component({
  selector: 'app-cadastro-usuario',
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatStepperModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit{
  formGroup!: FormGroup;
  tiposAvaliador: TipoAvaliador[] = [];
  hidePassword = true;

  constructor(private formbuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private avaliadorService: AvaliadorService,
    private tipoAvaliadorService: TipoAvaliadorService,
    private route: Router) {
      this.formGroup = this.formbuilder.group({ 
        dadosUsuario: this.formbuilder.group({ 
          nome: ['', Validators.required], 
          cpf: ['', Validators.required], 
          email: ['', [Validators.required, Validators.email]], 
          dataNacimento: [''], 
          serieAtual: [''], 
          tipoAvaliador:[null, Validators.required],
          login: ['', Validators.required], 
          senha: ['', Validators.required] 
        }), 
      });
  }

  ngOnInit(): void {
    this.tipoAvaliadorService.findAll().subscribe(data => {
      this.tiposAvaliador = data;
      this.initializeForm();
    });
  }

  initializeForm(){

    this.formGroup = this.formbuilder.group({
      tipoAvaliador: [this.tiposAvaliador],
    });
  }

/*   onSubmit(): void {
    const usuario = {
      nome: this.cadastroForm.get('dadosUsuario.nome')?.value,
      cpf: this.cadastroForm.get('dadosUsuario.cpf')?.value,
      email: this.cadastroForm.get('dadosUsuario.email')?.value,
      dataNacimento: this.cadastroForm.get('dadosUsuario.dataNacimento')?.value,
      serieAtual: this.cadastroForm.get('dadosUsuario.serieAtual')?.value,
      idTipoAvaliador: this.cadastroForm.get('dadosUsuario.tipoAvaliador.id')?.value,
      login: this.cadastroForm.get('dadosUsuario.login')?.value,
      senha: this.cadastroForm.get('dadosUsuario.senha')?.value
    };
  
    this.usuarioService.create(usuario).subscribe({   
      next: (res) => {
        console.log('Usuário cadastrado com sucesso:', res);
        this.route.navigateByUrl('/login');
      }
    });
  } */

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const subcategoria = this.formGroup.value;

      // selecionando a operacao (insert ou update)
      const operacao = subcategoria.id == null
      ? this.avaliadorService.insert(subcategoria)
      : this.avaliadorService.update(subcategoria);

      // executando a operacao
      operacao.subscribe({
        next: (subcategoriaCadastrada) => {
          this.route.navigateByUrl('/subcategorias');
        },
        error: (error) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
        }
      });
    }
  }
  
  formatDate(date: any): string {
    if (!date) return 'Não informado';
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('pt-BR');
    }
    return date.toLocaleDateString('pt-BR'); 
  }

  getFormGroup(controlName: string): FormGroup { 
    return this.formGroup.get(controlName) as FormGroup; 
  }
}
