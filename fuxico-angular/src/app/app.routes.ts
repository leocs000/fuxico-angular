import { Routes } from '@angular/router';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { Avaliacao1Component } from './components/avaliacao1/avaliacao1.component';
import { Avaliacao2Component } from './components/avaliacao2/avaliacao2.component';
import { Avaliacao3Component } from './components/avaliacao3/avaliacao3.component';
import { Avaliacao4Component } from './components/avaliacao4/avaliacao4.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: 'inicio', component: InicioComponent},
    { path: 'avaliacao', component: AvaliacaoComponent, title:'Avaliacao'},
    { path: 'avaliacao1', component: Avaliacao1Component, title:'Avaliacao'},
    { path: 'avaliacao2', component: Avaliacao2Component, title:'Avaliacao'},
    { path: 'avaliacao3', component: Avaliacao3Component, title:'Avaliacao'},
    { path: 'avaliacao4', component: Avaliacao4Component, title:'Avaliacao'},
    { path: 'agradecimento', component: ComentariosComponent },
];
