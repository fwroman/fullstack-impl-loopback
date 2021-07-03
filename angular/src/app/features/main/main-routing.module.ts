import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAdminComponent } from './components/data-admin/data-admin.component';
import { GitProfilesComponent } from './components/git-profiles/git-profiles.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: DataAdminComponent },
  { path: 'git-profiles', component: GitProfilesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
