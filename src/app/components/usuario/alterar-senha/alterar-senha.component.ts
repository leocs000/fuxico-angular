import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-alterar-senha',
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.css'
})
export class AlterarSenhaComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService) {
    
      this.formGroup = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', [Validators.required, this.differentFromCurrentPassword.bind(this)]],
      confirmarNovaSenha: ['', [Validators.required, this.matchNewPassword.bind(this)]]
    });
  }

  ngOnInit(): void {
    
  }

  differentFromCurrentPassword(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.formGroup) {
      const senhaAtual = this.formGroup.get('senhaAtual')?.value;
      if (control.value === senhaAtual) {
        return { sameAsCurrent: true };
      }
    }
    return null;
  }

  matchNewPassword(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.formGroup) {
      const novaSenha = this.formGroup.get('novaSenha')?.value;
      if (control.value !== novaSenha) {
        return { notMatching: true };
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const novaSenha = this.formGroup.get('novaSenha')?.value;
      this.usuarioService.alterarSenha(novaSenha).subscribe(response => {
        console.log('Senha alterada com sucesso:', response);
      });
    }
  }
}
