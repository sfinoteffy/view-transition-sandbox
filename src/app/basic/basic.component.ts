import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { StartViewTransitionService } from '../start-view-transition.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  private readonly startViewTransitionService = inject(StartViewTransitionService);
  blueBox = true;
  transitioning = false;

  async toggle() {
    this.transitioning = true;
    const transition = this.startViewTransitionService.startViewTransition(() => {
      this.blueBox = !this.blueBox;
    }) ;
    await transition.finished;
    this.transitioning = false;
  }
}
