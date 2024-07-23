import { Injector } from "@angular/core";

let injectorRef: Injector;

export function injector (injector?: Injector): Injector {
  if (!injector) {
    return injectorRef;
  }
  injectorRef = injector;
  return injectorRef;
}
