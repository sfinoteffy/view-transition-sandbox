export type StartViewTransitionFunction = (callback: () => any) => ViewTransition;

export interface ViewTransition {
  ready: Promise<any>;
  updateCallbackDone: Promise<any>;
  finished: Promise<any>;
  skipTransition: () => any;
}