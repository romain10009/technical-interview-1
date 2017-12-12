import {Component, Input} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'company-validation-errors',
  templateUrl: 'company-validation-errors.html',
  styleUrls: ['company-validation-errors.scss']
})
export class CompanyValidationErrorsComponent {

  @Input() validationMessages : any;
  @Input() fieldName : string;
  @Input() form : NgForm;

  constructor() {}
}
