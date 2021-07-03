import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPlus, faPencilAlt, faEye, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

const CSS_ANIMATION_RIGHT = "fr-animation-right";
const CSS_ANIMATION_LEFT = "fr-animation-left";
const CSS_ANIMATION_ACTIVE = "fr-animation-active";
const CSS_ANIMATION_NONE = "fr-no-animation";
const CSS_POSITION_RELATIVE = "fr-position-relative";

const ACTION_LIST = 'LIST';
const ACTION_CREATE = 'CREATE';
const ACTION_RETRIEVE = 'RETRIEVE';
const ACTION_UPDATE = 'UPDATE';
const ACTION_DELETE = 'DELETE';

@Component({
  selector: 'app-data-admin',
  templateUrl: './data-admin.component.html',
  styleUrls: ['./data-admin.component.scss']
})
export class DataAdminComponent implements OnInit, AfterViewInit {
  @ViewChild("animationContainer") animationContainerRef: ElementRef | any;
  @ViewChild("listContainer") listContainerRef: ElementRef | any;
  @ViewChild("detailContainer") detailContainerRef: ElementRef | any;
  @ViewChild("updateContainer") updateContainerRef: ElementRef | any;
  @ViewChild("deleteContainer") deleteContainerRef: ElementRef | any;
  private animationContainer: HTMLElement | any;
  private listContainer: HTMLElement | any;
  private detailContainer: HTMLElement | any;
  private updateContainer: HTMLElement | any;
  private deleteContainer: HTMLElement | any;

  public iconList: any;
  public iconNew: any;
  public iconDetail: any;
  public iconEdit: any;
  public iconDelete: any;

  public actionList: string;
  public actionCreate: string;
  public actionRetrieve: string;
  public actionUpdate: string;
  public actionDelete: string;
  public currentAction: string;

  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries: Country[] = [];

  public updateForm: FormGroup;
  public user: User;
  public formFields: FormlyFieldConfig[];

  constructor(
    private _Router: Router
  ) {
    this.iconList = faListAlt;
    this.iconNew = faPlus;
    this.iconDetail = faEye;
    this.iconEdit = faPencilAlt;
    this.iconDelete = faTrashAlt;

    this.actionList = ACTION_LIST;
    this.actionCreate = ACTION_CREATE;
    this.actionRetrieve = ACTION_RETRIEVE;
    this.actionUpdate = ACTION_UPDATE;
    this.actionDelete = ACTION_DELETE;
    this.currentAction = this.actionList;

    this.updateForm = new FormGroup({});
    this.user = new User();
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

  ngOnInit(): void {
    this.refreshCountries();
  }

  ngAfterViewInit() {
    this.animationContainer = this.animationContainerRef.nativeElement;
    this.listContainer = this.listContainerRef.nativeElement;
    this.detailContainer = this.detailContainerRef.nativeElement;
    this.updateContainer = this.updateContainerRef.nativeElement;
    this.deleteContainer = this.deleteContainerRef.nativeElement;
  }

  public onSubmit() {
    console.log(this.user);
  }

  /**
   * METHOD TO PROCESS A TASK BUTTON ACTION
   */
  public taskButtonClick(actionType: string) {
    const activeView: HTMLElement | any = this.animationContainer.querySelector("." + CSS_ANIMATION_ACTIVE);
    if (activeView instanceof HTMLElement) {
      activeView.classList.remove(CSS_POSITION_RELATIVE);
      activeView.classList.remove(CSS_ANIMATION_ACTIVE);
      activeView.classList.add(CSS_ANIMATION_LEFT);
      setTimeout(() => {
        activeView.classList.add(CSS_ANIMATION_NONE);
        activeView.classList.remove(CSS_ANIMATION_LEFT);
        activeView.classList.add(CSS_ANIMATION_RIGHT);
        setTimeout(() => {
          activeView.classList.remove(CSS_ANIMATION_NONE);
        }, 100);
      }, 400);
    }
    switch (actionType) {
      case ACTION_LIST:
        this.currentAction = this.actionList;
        if (this.listContainer instanceof HTMLElement) {
          this.listContainer.classList.remove(CSS_ANIMATION_RIGHT);
          this.listContainer.classList.add(CSS_ANIMATION_ACTIVE);
          setTimeout(() => {
            this.listContainer.classList.add(CSS_POSITION_RELATIVE);
          }, 500);
        }
        break;
      case ACTION_CREATE:
        this.currentAction = this.actionCreate;
        this._Router.navigate(['git-profiles']);
        break;
      case ACTION_RETRIEVE:
        this.currentAction = this.actionRetrieve;
        if (this.detailContainer instanceof HTMLElement) {
          this.detailContainer.classList.remove(CSS_ANIMATION_RIGHT);
          this.detailContainer.classList.add(CSS_ANIMATION_ACTIVE);
          setTimeout(() => {
            this.detailContainer.classList.add(CSS_POSITION_RELATIVE);
          }, 500);
        }
        break;
      case ACTION_UPDATE:
        this.currentAction = this.actionUpdate;
        if (this.updateContainer instanceof HTMLElement) {
          this.updateContainer.classList.remove(CSS_ANIMATION_RIGHT);
          this.updateContainer.classList.add(CSS_ANIMATION_ACTIVE);
          setTimeout(() => {
            this.updateContainer.classList.add(CSS_POSITION_RELATIVE);
          }, 500);
        }
        break;
      case ACTION_DELETE:
        this.currentAction = this.actionDelete;
        if (this.deleteContainer instanceof HTMLElement) {
          this.deleteContainer.classList.remove(CSS_ANIMATION_RIGHT);
          this.deleteContainer.classList.add(CSS_ANIMATION_ACTIVE);
          setTimeout(() => {
            this.deleteContainer.classList.add(CSS_POSITION_RELATIVE);
          }, 500);
        }
        break;
    }
  }

  refreshCountries() {
    this.countries = COUNTRIES
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}