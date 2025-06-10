import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoAvaliadorService } from '../../../services/tipo-avaliador.service';
import { TipoAvaliador } from '../../../models/tipo-avaliador.model';

@Component({
  selector: 'app-tipo-avaliador-form',
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './tipo-avaliador-form.component.html',
  styleUrl: './tipo-avaliador-form.component.css'
})
export class TipoAvaliadorFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tipoAvaliadorService: TipoAvaliadorService,
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
    const tipoAvaliador: TipoAvaliador = this.activatedRoute.snapshot.data['tipoAvaliador'];
    console.log(tipoAvaliador);

    this.formGroup = this.formBuilder.group({
      id:[(tipoAvaliador && tipoAvaliador.id) ? tipoAvaliador.id : null],
      descricao: [(tipoAvaliador && tipoAvaliador.descricao) ? tipoAvaliador.descricao : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const tipoAvaliador = this.formGroup.value;
      if (tipoAvaliador.id == null) {
        console.log("entrou no new");
        this.tipoAvaliadorService.insert(tipoAvaliador).subscribe({
          next: (grupoCadastrado) => {
            this.router.navigateByUrl('/tipoavaliador');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.tipoAvaliadorService.update(tipoAvaliador).subscribe({
          next: (tipoAvaliadorAlterado) => {
            this.router.navigateByUrl('/tipoavaliador');
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
      const tipoAvaliador = this.formGroup.value;
      if (tipoAvaliador.id != null) {
        this.tipoAvaliadorService.delete(tipoAvaliador).subscribe({
          next: () => {
            this.router.navigateByUrl('/tipoavaliador');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
