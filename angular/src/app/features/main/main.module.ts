import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DataAdminComponent } from './components/data-admin/data-admin.component';
import { GitProfilesComponent } from './components/git-profiles/git-profiles.component';
import { MainLinksComponent } from './components/main-links/main-links.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GithubControllerService } from './services/github-controller.service';
import { Loopabck4ControllerService } from './services/loopabck4-controller.service';
import { UsersListComponent } from './components/data-admin/components/users-list/users-list.component';
import { UserDetailComponent } from './components/data-admin/components/user-detail/user-detail.component';
import { UserEditComponent } from './components/data-admin/components/user-edit/user-edit.component';
import { DeleteDetailComponent } from './components/data-admin/components/delete-detail/delete-detail.component';


@NgModule({
  declarations: [HomeComponent, DataAdminComponent, GitProfilesComponent, MainLinksComponent, UsersListComponent, UserDetailComponent, UserEditComponent, DeleteDetailComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [GithubControllerService, Loopabck4ControllerService]
})
export class MainModule { }
