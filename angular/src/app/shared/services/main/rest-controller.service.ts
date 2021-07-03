import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestControllerService {

  constructor(
    private _HttpClient: HttpClient
  ) { }

  /**
   * GENERIC HTTP METHOD TO PERFORM A DELETE REQUEST
   * @param url 
   * @returns 
   */
  public PeticionHttpDeleteGenerica(url: string): Observable<any> {
    return this._HttpClient.delete(url);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A PUT REQUEST
   * @param url 
   * @param body 
   * @returns 
   */
  public PeticionHttpPutGenerica(url: string, body: any): Observable<any> {
    return this._HttpClient.put(url, body);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A POST REQUEST
   * @param url 
   * @param body 
   * @returns 
   */
  public PeticionHttpPostGenerica(url: string, body: any): Observable<any> {
    return this._HttpClient.post(url, body);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A GET REQUEST
   * @param url 
   * @returns 
   */
  public PeticionHttpGetGenerica(url: string): Observable<any> {
    return this._HttpClient.get(url);
  }
}
