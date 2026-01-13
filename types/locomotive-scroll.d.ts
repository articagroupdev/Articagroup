declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: HTMLElement | string | null;
    container?: HTMLElement | string | null;
    wrapper?: HTMLElement | string | null;
    smooth?: boolean;
    smoothMobile?: boolean;
    direction?: 'vertical' | 'horizontal';
    smartphone?: {
      smooth?: boolean;
    };
    tablet?: {
      smooth?: boolean;
    };
    reloadOnContextChange?: boolean;
    resetNativeScroll?: boolean;
    lerp?: number;
    class?: string;
    scrollbarContainer?: HTMLElement | string | null;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    scrollFromAnywhere?: boolean;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    scrollbar?: boolean;
    autoResize?: boolean;
    offset?: Array<number>;
    repeat?: boolean;
    inertia?: number;
    duration?: number;
    easing?: string | Array<number>;
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    touchDirection?: 'vertical' | 'horizontal' | 'both';
    resetScrollPosition?: boolean;
    onScroll?: (instance: LocomotiveScroll) => void;
    onUpdate?: (instance: LocomotiveScroll) => void;
    onResize?: (instance: LocomotiveScroll) => void;
    onDestroy?: (instance: LocomotiveScroll) => void;
  }

  class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    scroll: {
      instance: {
        scroll: {
          y: number;
          x: number;
        };
      };
    };
    el: HTMLElement;
    update(): void;
    start(): void;
    stop(): void;
    scrollTo(target: string | number | HTMLElement, options?: {
      offset?: number;
      duration?: number;
      easing?: string | Array<number>;
      disableLerp?: boolean;
    }): void;
    setScroll(x: number, y: number): void;
    destroy(): void;
    on(event: string, callback: (instance: LocomotiveScroll) => void): void;
    off(event: string, callback: (instance: LocomotiveScroll) => void): void;
    updateScroll(): void;
  }

  export default LocomotiveScroll;
}
