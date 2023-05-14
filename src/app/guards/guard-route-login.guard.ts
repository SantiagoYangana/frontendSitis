import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const guardRouteGuardLogin: CanActivateFn = () => {
  const api = inject(ApiService);
  const router = inject(Router);
  const token = api.getCurrentToken();
  if (token===null) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}
