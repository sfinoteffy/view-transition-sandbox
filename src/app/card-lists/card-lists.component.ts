import { Component, inject } from '@angular/core';
import { StartViewTransitionService } from '../start-view-transition.service';
import { CARDS } from './config';

@Component({
  selector: 'app-card-lists',
  templateUrl: './card-lists.component.html',
  styleUrls: ['./card-lists.component.scss']
})
export class CardListsComponent {
  private readonly startViewTransitionService = inject(StartViewTransitionService);
  public readonly cards = CARDS;
  
  moveCard(isDone: boolean, card: HTMLElement) {
    // Get the target list id
    const destination = document.getElementById(
      `js-list-${isDone ? "done" : "not-done"}`
    );

    // We'll use this class to hide the item controls while animation is running
    card.classList.add("card-moving", 'card-active');

    const transition = this.startViewTransitionService.startViewTransition(() => {
      // Run animation
      destination?.appendChild(card);
    });

    transition.finished.then(() => card.classList.remove('card-active'));
  }
}
