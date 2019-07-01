import { Directive, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  @HostBinding('class.open') toggleOpen:boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('click') function() {
    this.toggleOpen = !this.toggleOpen;
  }
}
