import {Component, Input, OnInit} from '@angular/core';
import {state, transition, trigger, animate, style} from "@angular/animations";

@Component({
  selector: 'company-loader',
  templateUrl: './company-loader.component.html',
  styleUrls: ['./company-loader.component.css'],
  animations:
    [
      trigger('fadeOut', [
          state('in', style({transform: 'scaleY(1)'})),
          transition(':leave', [
            animate(500, style({transform: 'scaleY(0)'}))
          ])
        ]
      )]
})
export class CompanyLoaderComponent implements OnInit {
  @Input() what : string;

  constructor() { }

  ngOnInit() {
  }

}
