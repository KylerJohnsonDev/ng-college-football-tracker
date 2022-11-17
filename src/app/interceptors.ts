import { HttpInterceptorFn } from '@angular/common/http';
import { API_KEY } from 'src/api-key';

export const sportsApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.sportsdata.io')) {
    const url = `${req.url}?key=${API_KEY}`;
    const newReq = req.clone({ url });
    return next(newReq);
  }
  return next(req);
};
