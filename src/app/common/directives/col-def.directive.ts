import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[colDef]'
})
export class ColDefDirective {
  @Input() colDef: string = '';
  constructor(public template: TemplateRef<any>) {}
}
