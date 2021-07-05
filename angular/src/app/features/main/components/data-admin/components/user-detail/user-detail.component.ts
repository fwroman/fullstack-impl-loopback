import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Loopabck4ControllerService } from 'src/app/features/main/services/loopabck4-controller.service';
import { User } from 'src/app/shared/models/user';
import { AnimatedImgService } from 'src/app/shared/services/animated-img.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedUserId: string | any;
  @Input() retrieveData: boolean | any;

  private _subscription: Subscription | any;
  public selectedUser: User;

  constructor(
    private _Loopabck4ControllerService: Loopabck4ControllerService,
    private _AnimatedImgService: AnimatedImgService
  ) {
    this.selectedUserId = "";
    this.selectedUser = new User();
  }

  ngOnInit(): void {
  }

  /**
   * METHOD TO PREPARE THE CANVAS TO SHOW THE PROFILE PICTURE
   */
  private initializeCanvasList() {
    const canvas = document.getElementById("profileImg");
    this._AnimatedImgService.renderAnimatedImg(canvas, this.selectedUser.avatarUrl);
  }

  /**
   * METHOD TO RETREIVE THE USER DATA BY HIS/HER ID FROM THE REST CLIENT CONTROLLER
   */
  private getUserById() {
    this._subscription = this._Loopabck4ControllerService.retrieveUserById(this.selectedUserId).subscribe((user: User) => {
      this.selectedUser = user;
      this.initializeCanvasList();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property == "retrieveData") {
        if (changes[property].currentValue == true) {
          setTimeout(() => {
            this.getUserById();
          }, 500);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
