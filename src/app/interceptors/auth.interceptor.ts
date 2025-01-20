import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const username = 'admin';
  const password = 'adminpassword';
  const authHeader = 'Basic ' + btoa(`${username}:${password}`);

  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', authHeader),
  });

  return next(clonedRequest);
};
