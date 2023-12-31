import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['login']);
      return of(false);
    })
  );
};
