import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
    LottieModule.forRoot({ player: playerFactory }), //PARA LAS ANIMACIONES DE LOTTIE FILES
  ]
})
export class SharedModule { }
