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

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: 'inicio', component: InicioComponent},
    { path: 'avaliacao', component: AvaliacaoFormComponent, title:'Avaliacao'},
    { path: 'agradecimento', component: ComentariosComponent },

    { path: 'categorias', component: CategoriaListComponent, title:'Categoria'},
    { path: 'categorias/new', component: CategoriaFormComponent, title:'Nova Categoria'},
    { path: 'categorias/edit/:id', component: CategoriaFormComponent, resolve: {categoria: categoriaResolver}},

    { path: 'subcategorias', component: SubcategoriaListComponent, title:'Subcategoria'},
    { path: 'subcategorias/new', component: SubcategoriaFormComponent, title:'Nova Subcategoria'},
    { path: 'subcategorias/edit/:id', component: SubcategoriaFormComponent, resolve: {subcategoria: subcategoriaResolver}},

    { path: 'questionarios', component: QuestionarioListComponent, title:'Questionario'},
    { path: 'questionarios/new', component: QuestionarioFormComponent, title:'Novo Questionario'},
    { path: 'questionarios/edit/:id', component: QuestionarioFormComponent, resolve: {questionario: questionarioResolver}},

    { path: 'tipoavaliador', component: TipoAvaliadorListComponent, title:'Tipo de avaliador'},
    { path: 'tipoavaliador/new', component: TipoAvaliadorFormComponent, title:'Novo Tipo de avaliador'},
    { path: 'tipoavaliador/edit/:id', component: TipoAvaliadorFormComponent, resolve: {tipoAvaliador: tipoAvaliadorResolver}},
];
