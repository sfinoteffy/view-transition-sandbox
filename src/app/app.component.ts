import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { fromEvent, take } from 'rxjs';
import { IMAGES } from './images/config';
import { ViewTransition } from './transition.model';
import { BasicComponent } from './basic/basic.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [BasicComponent]
})
export class AppComponent {
  

  
}
