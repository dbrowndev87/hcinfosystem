import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective implements OnInit {
  @Output() public change = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  public ngOnInit() {
    $(this.elementRef.nativeElement).datepicker({
      dateFormat: 'yy-mm-dd',
      changeYear: true,
      yearRange: "-100:+1",
      onSelect: (dateText) => {
        this.change.emit(dateText);
      }
    });
  }
}