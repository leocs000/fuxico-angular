import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Avaliacao } from '../../../models/avaliacao.model';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { inject } from '@angular/core';

export const avaliacaoResolver: ResolveFn<Avaliacao> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AvaliacaoService).findById(route.paramMap.get('id')!); 
};
