import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { fromEvent, take } from 'rxjs';
import { StartViewTransitionFunction, ViewTransition } from './transition.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  private overlayWrapper: HTMLElement | null = null;
  private overlayContent: HTMLElement | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    // console.log(this.startViewTransition);
    // console.log(this.startViewTransition(() => {}));
    this.overlayWrapper = this.document.getElementById("js-overlay");
    this.overlayContent = this.document.getElementById("js-overlay-target");
  }

  toggleImageView(index: number) {
    const image = document.getElementById(`js-gallery-image-${index}`);

    if (!image) {
      return;
    }

    image.classList.add("gallery__image--active");

    const imageParentElement = image?.parentElement;

    if (!imageParentElement) {
      return;
    }

    this.startViewTransition(() => this.moveImageToModal(image));

    if (this.overlayWrapper) {
      fromEvent(this.overlayWrapper, 'click').pipe(
        take(1)
      ).subscribe(() => {
        this.startViewTransition(() => this.moveImageToGrid(imageParentElement));
        image?.classList.remove("gallery__image--active");
        image?.classList.remove("gallery__image--active");
      })
    }
  }

  // Helper functions for moving the image around and toggling the overlay

  moveImageToModal(image: HTMLElement) {
    this.overlayWrapper?.classList.add("overlay--active");
    this.overlayContent?.append(image);
  }

  moveImageToGrid(imageParentElement: HTMLElement) {
    const image = this.overlayContent?.querySelector("img");
    if (!image) {
      return;
    }
    imageParentElement.append(image);
    this.overlayWrapper?.classList.remove("overlay--active");
  }

  startViewTransition(callback: () => any): ViewTransition {
    return (this.document as any).startViewTransition(callback)
  }
}
