import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { LottieModule } from 'ngx-lottie';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RestControllerService } from './services/main/rest-controller.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { AnimatedImgService } from './services/animated-img.service';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
    LottieModule.forRoot({ player: playerFactory }), //PARA LAS ANIMACIONES DE LOTTIE FILES
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    ToastComponent,
    LottieModule
  ],
  providers: [RestControllerService, ToastService, AnimatedImgService]
})
export class SharedModule { }
