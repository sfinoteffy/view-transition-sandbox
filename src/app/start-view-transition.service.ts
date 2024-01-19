import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { ViewTransition } from './transition.model';

@Injectable({
  providedIn: 'root'
})
export class StartViewTransitionService {
  private readonly document = inject(DOCUMENT);
  
  startViewTransition(callback: () => any): ViewTransition {
    return (this.document as any).startViewTransition(callback);
  }
}
