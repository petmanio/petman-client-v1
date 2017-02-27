import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[passwordToggleShow]',
  host: {
    '(click)': 'onClick($event)',
  }
})
export class PasswordToggleShowDirective {
  //TODO: user input instead of getAttribute
  private classNames: string[] = ['icon-view', 'icon-unview'];
  constructor(private el: ElementRef) {}

  onClick($event) {
    $event.stopPropagation();
    const target = document.querySelector(this.el.nativeElement.getAttribute('passwordtoggleshow'));
    if (target) {
      if (target.getAttribute('type') === 'password') {
        target.setAttribute('type', 'text');
        this.el.nativeElement.classList.add(...this.classNames);
      } else {
        target.setAttribute('type', 'password');
        this.el.nativeElement.classList.remove(...this.classNames);
      }
    }
  }

}
