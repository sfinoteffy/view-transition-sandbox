import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { fromEvent, take } from 'rxjs';
import { IMAGES } from './config';
import { StartViewTransitionService } from '../start-view-transition.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {
  private readonly startViewTransitionService = inject(StartViewTransitionService);
  @ViewChild('jsOverlay') private readonly overlayWrapper!: ElementRef<HTMLElement>;
  @ViewChild('jsOverlayTarget') private readonly overlayContent!: ElementRef<HTMLElement>;
  public readonly images = IMAGES;

  toggleImageView(image: HTMLImageElement) {
    if (!image) {
      return;
    }

    // Apply a CSS class that contains the view-transition-name before the animation starts.
    image.classList.add("gallery__image--active");

    const imageParentElement = image.parentElement;

    if (!imageParentElement) {
      return;
    }

    this.startViewTransitionService.startViewTransition(() => this.moveImageToModal(image));

    fromEvent(this.overlayWrapper.nativeElement, 'click').pipe(
      take(1)
    ).subscribe(async () => {
      const transition = this.startViewTransitionService.startViewTransition(() => this.moveImageToGrid(imageParentElement));

      await transition.finished;

      // Remove the class that contains the page-transition-tag after the animation ends.
      image.classList.remove("gallery__image--active");
    })
    
  }

  // Helper functions for moving the image around and toggling the overlay
  moveImageToModal(image: HTMLElement) {
    this.overlayWrapper.nativeElement.classList.add("overlay--active");
    this.overlayContent.nativeElement.append(image);
  }

  moveImageToGrid(imageParentElement: HTMLElement) {
    const image = this.overlayContent.nativeElement.querySelector("img");
    if (!image) {
      return;
    }
    imageParentElement.append(image);
    this.overlayWrapper.nativeElement.classList.remove("overlay--active");
  }
}
