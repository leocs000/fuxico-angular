import { Routes } from '@angular/router';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CategoriaListComponent } from './components/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { categoriaResolver } from './components/categoria/resolver/categoria.resolver';
import { SubcategoriaListComponent } from './components/subcategoria/subcategoria-list/subcategoria-list.component';
import { SubcategoriaFormComponent } from './components/subcategoria/subcategoria-form/subcategoria-form.component';
import { subcategoriaResolver } from './components/subcategoria/resolver/subcategoria.resolver';
import { QuestionarioListComponent } from './components/questionario/questionario-list/questionario-list.component';
import { QuestionarioFormComponent } from './components/questionario/questionario-form/questionario-form.component';
import { questionarioResolver } from './components/questionario/resolver/questionario.resolver';
import { TipoAvaliadorListComponent } from './components/tipo-avaliador/tipo-avaliador-list/tipo-avaliador-list.component';
import { TipoAvaliadorFormComponent } from './components/tipo-avaliador/tipo-avaliador-form/tipo-avaliador-form.component';
import { tipoAvaliadorResolver } from './components/tipo-avaliador/resolver/tipo-avaliador.resolver';
import { AvaliacaoFormComponent } from './components/avaliacao/avaliacao-form/avaliacao-form.component';
import { avaliacaoResolver } from './components/avaliacao/resolver/avaliacao.resolver';
import { AvaliadorListComponent } from './components/avaliador/avaliador-list/avaliador-list.component';
import { AvaliadorFormComponent } from './components/avaliador/avaliador-form/avaliador-form.component';
import { avaliadorResolver } from './components/avaliador/resolver/avaliador.resolver';
import { CadastroUsuarioComponent } from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import { LoginUsuarioComponent } from './components/usuario/login-usuario/login-usuario.component';
import { AlterarSenhaComponent } from './components/usuario/alterar-senha/alterar-senha.component';
import { authGuard } from './guard/auth.guard';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { AvaliacoesUsuarioComponent } from './components/usuario/avaliacoes-usuario/avaliacoes-usuario.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: 'inicio', component: InicioComponent, canActivate: [authGuard]},
    { path: 'cadastro', component: CadastroUsuarioComponent, title: 'Cadastro de usuario'},
    { path: 'login', component: LoginUsuarioComponent, title: 'Entrar'},
    { path: 'perfil', component: PerfilComponent, title: 'Perfil do usuário', canActivate: [authGuard]},
    { path: 'alterarsenha', component: AlterarSenhaComponent, title: 'Alterar Senha', canActivate: [authGuard]},

    { path: 'categorias', component: CategoriaListComponent, title:'Categoria'},
    { path: 'categorias/new', component: CategoriaFormComponent, title:'Nova Categoria', canActivate: [authGuard]},
    { path: 'categorias/edit/:id', component: CategoriaFormComponent, resolve: {categoria: categoriaResolver}, canActivate: [authGuard]},

    { path: 'subcategorias', component: SubcategoriaListComponent, title:'Subcategoria'},
    { path: 'subcategorias/new', component: SubcategoriaFormComponent, title:'Nova Subcategoria', canActivate: [authGuard]},
    { path: 'subcategorias/edit/:id', component: SubcategoriaFormComponent, resolve: {subcategoria: subcategoriaResolver}, canActivate: [authGuard]},

    { path: 'questionarios', component: QuestionarioListComponent, title:'Questionario'},
    { path: 'questionarios/new', component: QuestionarioFormComponent, title:'Novo Questionario', canActivate: [authGuard]},
    { path: 'questionarios/edit/:id', component: QuestionarioFormComponent, resolve: {questionario: questionarioResolver}, canActivate: [authGuard]},

    { path: 'tipoavaliador', component: TipoAvaliadorListComponent, title:'Tipo de avaliador'},
    { path: 'tipoavaliador/new', component: TipoAvaliadorFormComponent, title:'Novo Tipo de avaliador', canActivate: [authGuard]},
    { path: 'tipoavaliador/edit/:id', component: TipoAvaliadorFormComponent, resolve: {tipoAvaliador: tipoAvaliadorResolver}, canActivate: [authGuard]},

    { path: 'avaliacoes', component: ComentariosComponent, title:'Avaliacoes'},
    { path: 'avaliacoes/new/:id', component: AvaliacaoFormComponent, title:'Nova avaliacao', canActivate: [authGuard]},
    { path: 'avaliacoes/edit/:id', component: AvaliacaoFormComponent, resolve: {avaliacao: avaliacaoResolver}, canActivate: [authGuard]},

    { path: 'minhasAvaliacoes', component: AvaliacoesUsuarioComponent, title:'Minhas Avaliacoes'},

    { path: 'avaliadores', component: AvaliadorListComponent, title:'Usuarios'},
    { path: 'avaliadores/new', component: AvaliadorFormComponent, title:'Novo usuario', canActivate: [authGuard]},
    { path: 'avaliadores/edit/:id', component: AvaliadorFormComponent, resolve: {avaliador: avaliadorResolver}, canActivate: [authGuard]},
    
];
