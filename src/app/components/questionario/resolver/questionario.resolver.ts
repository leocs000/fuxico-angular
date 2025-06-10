import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Questionario } from '../../../models/questionario.model';
import { QuestionarioService } from '../../../services/questionario.service';
import { inject } from '@angular/core';

export const questionarioResolver: ResolveFn<Questionario> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(QuestionarioService).findById(route.paramMap.get('id')!); 
};