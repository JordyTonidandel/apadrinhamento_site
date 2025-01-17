import { HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 404) {
        toastr.error('Serviço não encontrado.');
      } else if (error.status === 400) {
        toastr.error('Requisição inválida. Por favor, revise os dados enviados.');
      } else if (error.status === 500) {
        toastr.error('Erro interno no servidor. Tente novamente mais tarde.');
      } else {
        toastr.error('Ocorreu um erro inesperado.');
      }
      return throwError(error);
    })
  );
};
