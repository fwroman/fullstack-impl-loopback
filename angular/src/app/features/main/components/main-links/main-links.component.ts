import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-links',
  templateUrl: './main-links.component.html',
  styleUrls: ['./main-links.component.scss']
})
export class MainLinksComponent implements OnInit {
  @Input() atHome: boolean;

  constructor() {
    this.atHome = false;
  }

  ngOnInit(): void {
  }

}
