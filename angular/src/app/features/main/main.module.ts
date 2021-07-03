import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DataAdminComponent } from './components/data-admin/data-admin.component';
import { GitProfilesComponent } from './components/git-profiles/git-profiles.component';
import { MainLinksComponent } from './components/main-links/main-links.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GithubControllerService } from './services/github-controller.service';


@NgModule({
  declarations: [HomeComponent, DataAdminComponent, GitProfilesComponent, MainLinksComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [GithubControllerService]
})
export class MainModule { }
