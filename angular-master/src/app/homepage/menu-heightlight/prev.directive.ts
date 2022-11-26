import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private element: ElementRef) { }
  
  @HostListener('click')

  prevFunc() {
    let elm = this.element.nativeElement.parentElement.parentElement.children[0];
    let item = elm.getElementsByClassName("item");
    elm.prepend(item[item.length - 1])
  }

}
