import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() selectedUser: User;

  public formFields: FormlyFieldConfig[];
  public updateForm: FormGroup;

  constructor() {
    this.selectedUser = new User();
    this.updateForm = new FormGroup({});
    this.formFields = [
      {
        key: 'username',
        type: 'input',
        templateOptions: {
          label: 'Nombre de usuario',
          required: true
        }
      },
      {
        key: 'nodeId',
        type: 'input',
        templateOptions: {
          label: 'Id. Nodo',
          required: true
        }
      },
      {
        key: 'avatarUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url de avatar',
          rows: 2,
          required: true
        }
      },
      {
        key: 'gravatarId',
        type: 'input',
        templateOptions: {
          label: 'Url de gavatar',
          required: false
        }
      },
      {
        key: 'url',
        type: 'textarea',
        templateOptions: {
          label: 'Url',
          rows: 2,
          required: true
        }
      },
      {
        key: 'htmlUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url Html',
          rows: 2,
          required: true
        }
      },
      {
        key: 'followersUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url Seguidores',
          rows: 2,
          required: true
        }
      },
      {
        key: 'followingUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url seguidos',
          rows: 2,
          required: true
        }
      },
      {
        key: 'gistsUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url gits',
          rows: 2,
          required: true
        }
      },
      {
        key: 'starredUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url starred',
          rows: 2,
          required: true
        }
      },
      {
        key: 'subscriptionsUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url suscripción',
          rows: 2,
          required: true
        }
      },
      {
        key: 'organizationsUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url de organizaciones',
          rows: 2,
          required: true
        }
      },
      {
        key: 'reposUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url de repositorios',
          rows: 2,
          required: true
        }
      },
      {
        key: 'eventsUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url de eventos',
          rows: 2,
          required: true
        }
      },
      {
        key: 'receivedEventsUrl',
        type: 'textarea',
        templateOptions: {
          label: 'Url de eventos recibidos',
          rows: 2,
          required: true
        }
      },
      {
        key: 'type',
        type: 'input',
        templateOptions: {
          label: 'Tipo',
          required: true
        }
      }
    ];
  }

  ngOnInit(): void { }

  /**
   * METHOD TO HANDLE THE SUBMIT EVENT OF THE FORM
   */
  public onSubmit() {
    console.log("this.selectedUser", this.selectedUser);
  }
}