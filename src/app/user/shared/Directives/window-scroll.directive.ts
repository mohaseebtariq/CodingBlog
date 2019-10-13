import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appWindowScroll]'
})
export class WindowScrollDirective {

  @HostListener('window:scroll', [])
  scrollHandler() {
    const navbar = <HTMLElement>document.querySelector('.navbar');
    const scrollHeight = document.body.scrollTop > 620 ||
      document.documentElement.scrollTop > 620

    if (scrollHeight) {
      navbar.style.backgroundColor = '#B93342';
    }
    else {
      navbar.style.backgroundColor = '';
    }
  }
}
