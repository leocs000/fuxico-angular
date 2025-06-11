import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AvaliadorService } from '../../../services/avaliador.service';
import { TipoAvaliador } from '../../../models/tipo-avaliador.model';
import { Avaliador } from '../../../models/avaliador.model';
import { TipoAvaliadorService } from '../../../services/tipo-avaliador.service';

@Component({
  selector: 'app-avaliador-form',
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './avaliador-form.component.html',
  styleUrl: './avaliador-form.component.css'
})
export class AvaliadorFormComponent implements OnInit{
  formGroup: FormGroup;
  tiposAvaliador: TipoAvaliador[] =[];


  constructor(private formBuilder: FormBuilder,
    private avaliadorService: AvaliadorService,
    private tipoAvaliadorService: TipoAvaliadorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        id:[null],
        nome:['', Validators.required],
        cpf: ['', Validators.required],
        email: ['', Validators.required],
        dataNacimento: ['', Validators.required],
        serieAtual: ['', Validators.required],
        tipoAvaliador: [null, Validators.required],
        login: ['', Validators.required],
        senha: ['', Validators.required],
      })
  }

  ngOnInit(): void {
      this.tipoAvaliadorService.findAll().subscribe(data => {
      this.tiposAvaliador = data;
      this.initializeForm();
    });
  }

  initializeForm(): void{
    const avaliador: Avaliador = this.activatedRoute.snapshot.data['avaliador'];

    const tipoAvaliador = this.tiposAvaliador.find(tipoAvaliador => tipoAvaliador.id === (avaliador?.tipoAvaliador?.id || null));
    //selecionando o estasdo
//    const estado = this.clientes.find(estado => estado.id === (municipio?.estado?.id || null));

    this.formGroup = this.formBuilder.group({
      id:[(avaliador && avaliador.id) ? avaliador.id : null],
      nome: [(avaliador && avaliador.nome) ? avaliador.nome : '', Validators.required],
      cpf: [(avaliador && avaliador.cpf) ? avaliador.cpf : '', Validators.required],
      email: [(avaliador && avaliador.email) ? avaliador.email : '', Validators.required],
      dataNacimento: [(avaliador && avaliador.dataNascimento) ? avaliador.dataNascimento : '', Validators.required],
      serieAtual: [(avaliador && avaliador.serieAtual) ? avaliador.serieAtual : '', Validators.required],
      tipoAvaliador: [tipoAvaliador],
      /*       numeroRegistro_posse_porte: [(cliente && cliente.numeroRegistro_posse_porte) ? cliente.numeroRegistro_posse_porte : '', Validators.required],
      login: [(cliente && cliente.login) ? cliente.login : '', Validators.required],
      senha: [(cliente && cliente.senha) ? cliente.senha : '', Validators.required] */
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoAvaliador = this.formGroup.value;
      this.avaliadorService.insert(novoAvaliador).subscribe({
        next: (AvaliadorCadastrado) => {
          this.router.navigateByUrl('/avaliadores');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }

  
  salvar() {
    if (this.formGroup.valid) {
      const avaliador = this.formGroup.value;
      if (avaliador.id ==null) {
        this.avaliadorService.insert(avaliador).subscribe({
          next: (AvaliadorCadastrado) => {
            this.router.navigateByUrl('/avaliadores');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.avaliadorService.update(avaliador).subscribe({
          next: (avaliadorAlterado) => {
            this.router.navigateByUrl('/avaliadores');
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
      const avaliador = this.formGroup.value;
      if (avaliador.id != null) {
        this.avaliadorService.delete(avaliador).subscribe({
          next: () => {
            this.router.navigateByUrl('/avaliadores');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
