import { Routes } from '@angular/router';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'avaliacao'},
    { path: 'avaliacao', component: AvaliacaoComponent, title:'Avaliacao'}
];
