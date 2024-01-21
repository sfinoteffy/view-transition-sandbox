import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StartViewTransitionService } from '../start-view-transition.service';

@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class BasicComponent {
  private readonly startViewTransitionService = inject(StartViewTransitionService);
  blueBox = true;

  toggle() {
    this.startViewTransitionService.startViewTransition(() => {
      this.blueBox = !this.blueBox;
    });
  }
}
