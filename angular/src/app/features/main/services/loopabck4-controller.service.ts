import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { RestControllerService } from 'src/app/shared/services/main/rest-controller.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Loopabck4ControllerService {

  constructor(
    private _RestControllerService: RestControllerService
  ) { }

  /**
   * METHOD TO DELETE A USER FROM THE LOCAL DATABASE
   */
  public deleteUserById(userId: string): Observable<unknown> {
    const url = `${environment.apiLoopback4}/users/${userId}`;
    return this._RestControllerService.genericHttpRequestDelete(url);
  }

  /**
   * METHOD TO PARTIALLY UPDATE A USER FROM THE LOCAL DATABASE
   */
  public updateUserPartiallyById(user: User): Observable<unknown> {
    const url = `${environment.apiLoopback4}/users/${user.id}`;
    return this._RestControllerService.genericHttpRequestPatch(url, user);
  }

  /**
   * METHOD TO RETRIEVE A USER BY HIS/HER ID FROM THE LOCAL DATABASE
   */
  public retrieveUserById(userId: string): Observable<User> {
    const url = `${environment.apiLoopback4}/users/${userId}`;
    return this._RestControllerService.genericHttpRequestGet(url);
  }

  /**
   * METHOD TO CREATE A NEW USER IN THE LOCAL DATABASE
   */
  public createUser(user: User): Observable<User> {
    const url = `${environment.apiLoopback4}/users`;
    return this._RestControllerService.genericHttpRequestPost(url, user);
  }

  /**
   * METHOD TO GET THE RECORDS COUNT FROM USER DOCUMENT
   */
  public countUsers(): Observable<number> {
    const url = `${environment.apiLoopback4}/users/count`;
    return this._RestControllerService.genericHttpRequestGet(url);
  }

  /**
   * METHOD TO OBTAIN A PAGINATED LIST OF USERS FROM THE LOCAL DATABASE
   */
  public listAllUsers(pageNumber: number, pageSize: number, orderBy: string): Observable<User[]> {
    const url = `${environment.apiLoopback4}/users?filter[offset]=${pageNumber * pageSize}&filter[limit]=${pageSize}&filter[order]=${orderBy}`;
    return this._RestControllerService.genericHttpRequestGet(url);
  }
}
