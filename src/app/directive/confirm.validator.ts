import { FormGroup } from '@angular/forms';

export function ConfirmVal(field1: string, field2: string) {
  return (form: FormGroup) => {
    const valueFromField1 = form.controls[field1];
    const valueFromField2 = form.controls[field2];

    //retun null if controls havent initialised
    if (!valueFromField1 || !valueFromField2) {
      return null;
    }

    // if already any error is attached dont attach again
    if (valueFromField2.errors && !valueFromField2.errors['appConfirmEqualValidator']) {
      return null;
    }

    //set the error if confirm field validaiton fails
    if(valueFromField1.value !== valueFromField2.value){
        valueFromField2.setErrors({appConfirmEqualValidator:true});
        return null;
    }else{
        valueFromField2.setErrors(null);
        return null;
    }
  };
}
