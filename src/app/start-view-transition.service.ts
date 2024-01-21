import { DOCUMENT } from '@angular/common';
import { inject, Injectable, NgZone } from '@angular/core';
import { ViewTransition } from './transition.model';

@Injectable({
  providedIn: 'root'
})
export class StartViewTransitionService {
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  
  startViewTransition(callback: () => any): ViewTransition {
    return (this.document as any).startViewTransition(() => this.ngZone.run(callback));
  }
}
