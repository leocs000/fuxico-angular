import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Subcategoria } from '../../../models/subcategoria.model';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { inject } from '@angular/core';

export const subcategoriaResolver: ResolveFn<Subcategoria> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(SubcategoriaService).findById(route.paramMap.get('id')!); 
};
