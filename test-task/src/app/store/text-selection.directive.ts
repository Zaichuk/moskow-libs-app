import {
  Directive,
  ElementRef,
  Input,
  SecurityContext,
  SimpleChanges
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Directive({
  selector: '[appTextSelection]',
  standalone: true
})
export class TextSelectionDirective {

  @Input()
  appTextSelection?: string;

  @Input()
  initialValue?: string;

  constructor(private _host: ElementRef, private _sanitizer: DomSanitizer) {}


  private _selectFilterValue(initialValue: string, filterValue: string): string {
    return initialValue.replace(new RegExp(filterValue, 'gi'), `<mark>${filterValue}</mark>`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filterValue: string = changes['appTextSelection'].currentValue.trim();
    const initialValue: string = this.initialValue ?? changes['initialValue']?.currentValue;

    if (filterValue.length) {
      this._host.nativeElement.innerHTML = this._sanitizer.sanitize(SecurityContext.HTML, this._selectFilterValue(initialValue, filterValue));
    } else {
      this._host.nativeElement.innerHTML = this._sanitizer.sanitize(SecurityContext.HTML, initialValue);
    }
  }
}
