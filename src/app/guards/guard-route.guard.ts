import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';

export const guardRouteGuard: CanActivateFn = () => {
  const api = inject(ApiService);
  const router = inject(Router);
  const token =api.getCurrentToken();
  if (token!="administrador") {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
