import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GitUser } from 'src/app/shared/interfaces/git-user';
import { GithubControllerService } from '../../services/github-controller.service';
import { faChevronLeft, faChevronRight, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Loopabck4ControllerService } from '../../services/loopabck4-controller.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AnimatedImgService } from 'src/app/shared/services/animated-img.service';

const CANVAS_ID_PREFIX = 'gituser-';

@Component({
  selector: 'app-git-profiles',
  templateUrl: './git-profiles.component.html',
  styleUrls: ['./git-profiles.component.scss']
})
export class GitProfilesComponent implements OnInit, OnDestroy {
  private loadUsersSubs: Subscription | any;

  public fullUserList: GitUser[];
  public filteredUserList: GitUser[];
  public canvasIdPrefix: string;

  public iconLeft: any;
  public iconRight: any;
  public iconSearch: any;
  public iconCancel: any;

  public page: number;
  public pageLimit: number;
  public filterPattern: string;
  public searching: boolean;

  constructor(
    private _GithubControllerService: GithubControllerService,
    private _Loopabck4ControllerService: Loopabck4ControllerService,
    private _Router: Router,
    private _ToastService: ToastService,
    private _AnimatedImgService: AnimatedImgService
  ) {
    this.fullUserList = [];
    this.filteredUserList = [];
    this.canvasIdPrefix = CANVAS_ID_PREFIX;

    this.iconLeft = faChevronLeft;
    this.iconRight = faChevronRight;
    this.iconSearch = faSearch;
    this.iconCancel = faTimes;
    this.page = 0;
    this.pageLimit = 5;
    this.filterPattern = "";
    this.searching = false;
  }

  ngOnInit(): void {
    this.loadGitUsers();
  }

  /**
   * METHOD TO ADD A NEW USER FROM THE GITHUB API TO THE LOCAL DATABASE
   */
  public createNewRecord(gitUser: GitUser) {
    const user = new User(null, gitUser.login, gitUser.id, gitUser.nodeId, gitUser.avatarUrl, gitUser.gravatarId, gitUser.url, gitUser.htmlUrl,
      gitUser.followersUrl, gitUser.followingUrl, gitUser.gistsUrl, gitUser.starredUrl, gitUser.subscriptionsUrl, gitUser.organizationsUrl,
      gitUser.reposUrl, gitUser.eventsUrl, gitUser.receivedEventsUrl, gitUser.type, gitUser.siteAdmin);
    delete user.id;
    this._Loopabck4ControllerService.createUser(user).subscribe(
      (respData: User) => {
        this._Router.navigate(['/admin']);
      },
      (err) => {
        this._ToastService.show(err.error.message, { classname: 'bg-info text-light', delay: 5000 });
      });
  }

  /**
   * METHOD TO CANCEL THE USER SEARCHING
   */
  public cancelSearching() {
    this.filterPattern = "";
    this.searching = false;
    this.filteredUserList = JSON.parse(JSON.stringify(this.fullUserList)).slice(this.page, this.pageLimit);
    setTimeout(() => {
      this.initializeCanvasList();
    }, 500);
  }

  /**
   * METHOD TO SEARCH A GIT USER BY HIS/HER USERNAME FROM THE GIT HUB CONTROLLER SERVICE
   */
  public searchByUsername() {
    this.searching = true;
    this._GithubControllerService.getUsersByUseraname(this.filterPattern).subscribe((userData: GitUser) => {
      this.filteredUserList = [userData];
      setTimeout(() => {
        this.initializeCanvasList();
      }, 500);
    });
  }

  /**
   * METHOD TO FILTER AND PREPARE THE GIT HUB USER LIST TO BE SHOWN IN THE VIEW IN AN SPECIFIC PAGE
   */
  public filterUsersList(goForward: boolean) {
    this.page = goForward ? this.page + 1 : this.page - 1;
    const filterFrom = this.page * this.pageLimit;
    const filterTo = filterFrom + this.pageLimit;
    this.filteredUserList = JSON.parse(JSON.stringify(this.fullUserList)).slice(filterFrom, filterTo);
    setTimeout(() => {
      this.initializeCanvasList();
    }, 500);
  }

  /**
   * METHOD TO PREPARE THE CANVAS TO SHOW THE PROFILES PICTURES
   */
  private initializeCanvasList() {
    this.filteredUserList.map((record, index) => {
      const canvas = document.getElementById(this.canvasIdPrefix + record.id);
      this._AnimatedImgService.renderAnimatedImg(canvas, record.avatarUrl);
    });
  }

  /**
   * METHOD TO LOAD ALL GITHUB USERS FROM THE GIT HUB CONTROLLER SERVICE
   */
  private loadGitUsers() {
    this.loadUsersSubs = this._GithubControllerService.getAllUsers().subscribe((gitUserList: GitUser[]) => {
      this.fullUserList = gitUserList;
      this.filteredUserList = JSON.parse(JSON.stringify(this.fullUserList)).slice(this.page, this.pageLimit);
      setTimeout(() => {
        this.initializeCanvasList();
      }, 500);
    });
  }

  ngOnDestroy() {
    if (this.loadUsersSubs) {
      this.loadUsersSubs.unsubscribe();
    }
  }
}
