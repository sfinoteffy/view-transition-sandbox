import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { fromEvent, take } from 'rxjs';
import { IMAGES } from './config';
import { ViewTransition } from './transition.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
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

    this.startViewTransition(() => this.moveImageToModal(image));

    fromEvent(this.overlayWrapper.nativeElement, 'click').pipe(
      take(1)
    ).subscribe(async () => {
      const transition = this.startViewTransition(() => this.moveImageToGrid(imageParentElement));

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

  startViewTransition(callback: () => any): ViewTransition {
    return (this.document as any).startViewTransition(callback);
  }
}
