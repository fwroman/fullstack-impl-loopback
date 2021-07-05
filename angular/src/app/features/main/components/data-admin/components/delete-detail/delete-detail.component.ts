import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Loopabck4ControllerService } from 'src/app/features/main/services/loopabck4-controller.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'delete-detail',
  templateUrl: './delete-detail.component.html',
  styleUrls: ['./delete-detail.component.scss']
})
export class DeleteDetailComponent implements OnInit {
  @Input() selectedUser: User;
  @Output() afterUserDeleted: EventEmitter<boolean>;

  private _subscription: Subscription | any;

  constructor(
    private _Loopabck4ControllerService: Loopabck4ControllerService
  ) {
    this.selectedUser = new User();
    this.afterUserDeleted = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  /**
   * METHOD TO DELETE THE USER BY HIS/HER ID FROM THE REST CLIENT CONTROLLER
   */
  public getUserById() {
    if (this.selectedUser.id) {
      this._subscription = this._Loopabck4ControllerService.deleteUserById(this.selectedUser.id).subscribe(() => {
        this.afterUserDeleted.emit(true);
      });
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
