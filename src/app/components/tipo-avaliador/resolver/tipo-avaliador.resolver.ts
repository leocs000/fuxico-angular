import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TipoAvaliador } from '../../../models/tipo-avaliador.model';
import { TipoAvaliadorService } from '../../../services/tipo-avaliador.service';
import { inject } from '@angular/core';

export const tipoAvaliadorResolver: ResolveFn<TipoAvaliador> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(TipoAvaliadorService).findById(route.paramMap.get('id')!); 
};
