import { Injectable } from '@angular/core';
import { GitUser } from 'src/app/shared/interfaces/git-user';
import { RestControllerService } from 'src/app/shared/services/main/rest-controller.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubControllerService {

  constructor(
    private _RestControllerService: RestControllerService
  ) { }

  /**
   * METHOD TO OBTAIN A USER BYHIS/HER USERNAME FROM THE OPEN GITHUB REST API
   * @returns 
   */
  public getUsersByUseraname(username: string): Observable<GitUser> {
    const url = `${environment.openApiGitHub}/users/${username}`;
    return this._RestControllerService.genericHttpRequestGet(url)
      .pipe(
        map((resp: any) => {
          return this.formatGitUserData(resp);
        })
      );
  }

  /**
   * METHOD TO OBTAIN A USERS LIST FROM THE OPEN GITHUB REST API
   * @returns 
   */
  public getAllUsers(): Observable<GitUser[]> {
    const url = `${environment.openApiGitHub}/users?per_page=100`;
    return this._RestControllerService.genericHttpRequestGet(url)
      .pipe(
        map((resp: any[]) => {
          let gitUserList: GitUser[] = [];
          resp.map((record, index) => {
            gitUserList.push(this.formatGitUserData(record));
          });
          return gitUserList;
        })
      );
  }

  /**
   * METHOD TO FORMAT JSON USER DATA COMMING FROM GITHUB'S API INTO A LOCAL GitUser INTERFACE
   * @param userData 
   * @returns 
   */
  private formatGitUserData(userData: any): GitUser {
    return {
      login: userData.login,
      id: userData.id,
      nodeId: userData.node_id,
      avatarUrl: userData.avatar_url,
      gravatarId: userData.gravatar_id,
      url: userData.url,
      htmlUrl: userData.html_url,
      followersUrl: userData.followers_url,
      followingUrl: userData.following_url,
      gistsUrl: userData.gists_url,
      starredUrl: userData.starred_url,
      subscriptionsUrl: userData.subscriptions_url,
      organizationsUrl: userData.organizations_url,
      reposUrl: userData.repos_url,
      eventsUrl: userData.events_url,
      receivedEventsUrl: userData.receivedEvents_url,
      type: userData.type,
      siteAdmin: userData.site_admin
    };
  }
}