import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { StartViewTransitionService } from '../start-view-transition.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class BasicComponent {
  private readonly startViewTransitionService = inject(StartViewTransitionService);
  private readonly cdr = inject(ChangeDetectorRef);
  blueBox = true;
  transitioning = false;

  toggle() {
    this.startViewTransitionService.startViewTransition(() => {
      this.blueBox = !this.blueBox;
      this.cdr.detectChanges();
    }) ;
  }
}
