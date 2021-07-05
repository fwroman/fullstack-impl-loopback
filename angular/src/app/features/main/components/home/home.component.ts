import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public OpcionesAnimacion: AnimationOptions;

  constructor() {
    this.OpcionesAnimacion = {
      path: "https://assets3.lottiefiles.com/packages/lf20_dyppatws.json"
    };
  }

  ngOnInit(): void {
  }

}
