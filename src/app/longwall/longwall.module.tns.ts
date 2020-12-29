import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { OperatorComponent } from './component/operator/operator.component';



@NgModule({
  declarations: [OperatorComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LongwallModule { }
