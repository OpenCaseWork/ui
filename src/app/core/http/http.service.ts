import { Injectable, EventEmitter }                 from '@angular/core';
import { Http, Headers, RequestOptions,
        RequestOptionsArgs, Response, RequestMethod,
        Request, Connection, ConnectionBackend }    from '@angular/http';
import { EnvironmentService } from './../environment.service';
import { HttpHeaderService } from './http-header.service';
import { LogService } from './../logging/log.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


export enum Action { QueryStart, QueryStop };

@Injectable()
export class HttpService {

  process: EventEmitter<Action> = new EventEmitter<Action>();
  authFailed: EventEmitter<Error> = new EventEmitter<Error>();

  constructor(
    private _http: Http,
    private environmentService: EnvironmentService,
    private logService: LogService,
    private httpHeaderService: HttpHeaderService) {
   }

  private buildUrl(url: string): string {
    return this.environmentService.apiUrl + url;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    //return this.request(RequestMethod.Get, this.buildUrl(url), null, options);
    return this._http.get(this.buildUrl(url));
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Post, this.buildUrl(url), body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Put, this.buildUrl(url), body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Delete, this.buildUrl(url), null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Patch, this.buildUrl(url), body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Head, this.buildUrl(url), null, options);
  }


  public request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
    const requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: url,
      body: body
    }, options));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let request = new RequestOptions({ method: method, headers: headers, body: body, url: url });
    //if (!requestOptions.headers) {
    //  requestOptions.headers = this.httpHeaderService.buildHeader();
    //}

    return Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      //this._http.request(new Request(requestOptions))
      this._http.request(new Request(request))
        .map(res => res)
        .finally(() => {
          this.process.next(Action.QueryStop);
      })
        .subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          this.logService.error(requestOptions);
          switch (err.status) {
            case 401: // intercept 401
              // TODO: response to authFailed by re-getting token
              this.authFailed.next(err);
              observer.error(err);
              break;
            case 403: // intercept 403
              // TODO: respond by logging someone out of application?
              this.authFailed.next(err);
              observer.error(err);
              break;
            default:
              observer.error(err);
              break;
          }
        });
    });
  }
}
