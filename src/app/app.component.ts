import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { StartViewTransitionFunction } from './transition.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  private readonly startViewTransition: StartViewTransitionFunction =  (this.document as any).startViewTransition;

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.startViewTransition);
    console.log(this.startViewTransition(() => {}))
  }
}
