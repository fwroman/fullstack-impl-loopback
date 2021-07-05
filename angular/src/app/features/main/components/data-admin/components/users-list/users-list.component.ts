import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Loopabck4ControllerService } from 'src/app/features/main/services/loopabck4-controller.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @Output() onRowSelected: EventEmitter<User>;
  private subscription: Subscription | any;

  public page: number = 1;
  public pageSize: number = 4;
  public collectionSize: number | any;
  public userList: User[] = [];

  constructor(
    private _Loopabck4ControllerService: Loopabck4ControllerService
  ) {
    this.page = 1;
    this.pageSize = 5;
    this.onRowSelected = new EventEmitter<User>();
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  /**
   * METHOD TO OBTAIN THE SELECTED ROW FROM THE TABLE
   */
  public onSelectRow(user: User) {
    this.onRowSelected.emit(user);
  }

  /**
   * METHOD TO CHANGE THE PAGE WHEN THE USER CLICKS A PAGINATION BUTTON
   */
  public changePage() {
    this.getUsersList();
  }

  /**
   * METHOD TO GET THE USERS LIST FROM THE LOCAL REST-CLIENT CONTROLLER
   */
  private getUsersList() {
    this.subscription = this._Loopabck4ControllerService.countUsers()
      .pipe(
        mergeMap((userCount: any) => {
          this.collectionSize = userCount.count;
          return this._Loopabck4ControllerService.listAllUsers(this.page - 1, this.pageSize, "createdAt");
        })
      ).subscribe((userList: User[]) => {
        this.userList = userList;
        this.collectionSize
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
