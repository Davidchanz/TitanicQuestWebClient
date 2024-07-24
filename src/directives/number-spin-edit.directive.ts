import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberSpinEdit]',
  standalone: true
})
export class NumberSpinEditDirective {
  constructor() { }

  @HostListener("keydown", ['$event'])
  keyDown(event: KeyboardEvent): boolean {
    return false;
  }
}
