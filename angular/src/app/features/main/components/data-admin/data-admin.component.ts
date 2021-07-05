import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPlus, faPencilAlt, faEye, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

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
  public selectedUser: User;
  public reloadList: boolean | any;

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
    this.selectedUser = new User();
    this.reloadList = false;
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.animationContainer = this.animationContainerRef.nativeElement;
    this.listContainer = this.listContainerRef.nativeElement;
    this.detailContainer = this.detailContainerRef.nativeElement;
    this.updateContainer = this.updateContainerRef.nativeElement;
    this.deleteContainer = this.deleteContainerRef.nativeElement;
  }

  /**
   * METHOD
   * @param event 
   */
  public goToMainList(event: boolean) {
    this.taskButtonClick(ACTION_LIST);
    this.reloadList = null;
    setTimeout(() => {
      this.reloadList = true;
    });
  }

  /**
   * METHOD TO CATCH THE SELECTED USER THROUGH A EVENT EMITTER FROM THE CHILD COMPONENT
   * @param $event 
   */
  public catchSelectedRow(event: User) {
    this.selectedUser = event;
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
        this.selectedUser = new User();
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
}