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
  public genericHttpRequestDelete(url: string): Observable<any> {
    return this._HttpClient.delete(url);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A PUT REQUEST
   * @param url 
   * @param body 
   * @returns 
   */
  public genericHttpRequestPut(url: string, body: any): Observable<any> {
    return this._HttpClient.put(url, body);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A PATCH REQUEST
   * @param url 
   * @param body 
   * @returns 
   */
  public genericHttpRequestPatch(url: string, body: any): Observable<any> {
    return this._HttpClient.patch(url, body);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A POST REQUEST
   * @param url 
   * @param body 
   * @returns 
   */
  public genericHttpRequestPost(url: string, body: any): Observable<any> {
    return this._HttpClient.post(url, body);
  }

  /**
   * GENERIC HTTP METHOD TO PERFORM A GET REQUEST
   * @param url 
   * @returns 
   */
  public genericHttpRequestGet(url: string): Observable<any> {
    return this._HttpClient.get(url);
  }
}
