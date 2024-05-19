import { Directive, HostListener, Input, Output, ElementRef, Renderer2, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[trueFalseValue]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrueFalseValueDirective),
      multi: true
    }
  ]
})
export class TrueFalseValueDirective implements ControlValueAccessor {

  @Input() trueValue = true;
  @Input() falseValue = false;
  private propagateChange: (_: any) => {};
  private propagateTouch: (_: any) => {};
  @HostBinding('disabled') disabled = false;
  @HostListener('change', ['$event'])
  onChange(ev: any) {
    this.propagateTouch(true);
    this.propagateChange(ev.target.checked ? this.trueValue : this.falseValue);
  }
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // throw new Error("Method not implemented.");
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  writeValue(obj: any): void {
    if (obj === this.trueValue) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', true);
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', false);
    }
  }

}
