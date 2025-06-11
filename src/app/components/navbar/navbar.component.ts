import { Component, OnInit } from '@angular/core';
import { AvaliadorService } from '../../services/avaliador.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  userIcon: string = 'path-to-user-icon.png'; // Substitua pelo caminho do ícone do usuário
  hidePassword = true;

  constructor(private avaliadorService: AvaliadorService, private router: Router,
          private authService: AuthService, 
          private iconRegistry: MatIconRegistry,
          private sanitizer: DomSanitizer) {
    // Registre um ícone SVG personalizado
    iconRegistry.addSvgIcon(
      'user',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user.svg')
    );
  } 

  ngOnInit(): void {
    this.avaliadorService.findDadosPessoais().subscribe(data => {
      this.userName = data.nome;
      // Se você tiver um campo para o ícone do usuário, pode atribuí-lo aqui
      // this.userIcon = data.userIcon;
    });
  }

  formatDate(date: any): string {
    if (!date) return 'Não informado';
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('pt-BR');
    }
    return date.toLocaleDateString('pt-BR');
  }

  logout(): void {
    this.authService.removeUsuarioLogado();
    this.router.navigate(['/login']);
  }
}
