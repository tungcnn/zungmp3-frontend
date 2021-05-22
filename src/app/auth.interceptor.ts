import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import {TokenServiceService} from 'src/app/service/token/token-service.service';

const TOKEN_HEADER_KEY = 'TungSangDuyHang';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        let authReq = req;
        const token = this.token.getToken();
        if(token != null){
            authReq.clone({
                headers:req.headers.set(TOKEN_HEADER_KEY, 'Bearer'+token)
            });
        }
        return next.handle(authReq);
    }
}
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, UseClass: AuthInterceptor, multi: true}
]