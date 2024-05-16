import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS } from '@angular/forms';
import { ConfirmVal } from './confirm.validator';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers:[
    {provide:NG_VALIDATORS,useExisting: ConfirmEqualValidatorDirective,multi: true}
  ]
})
export class ConfirmEqualValidatorDirective {
  @Input('appConfirmEqualValidator') matchStr: string[];
  constructor() {
    this.matchStr = [];
  }

  public validate(formGroup: FormGroup) {
    ConfirmVal(this.matchStr[0], this.matchStr[1])(formGroup);
  }

}
