import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private element: ElementRef) { }
  
  @HostListener('click')

  newFunc() {
    let elm = this.element.nativeElement.parentElement.parentElement.children[0];
    let item = elm.getElementsByClassName("item");
    elm.append(item[0])
  }

}
