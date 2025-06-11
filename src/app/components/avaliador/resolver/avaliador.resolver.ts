import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Avaliador } from '../../../models/avaliador.model';
import { inject } from '@angular/core';
import { AvaliadorService } from '../../../services/avaliador.service';

export const avaliadorResolver: ResolveFn<Avaliador> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AvaliadorService).findById(route.paramMap.get('id')!); 
};