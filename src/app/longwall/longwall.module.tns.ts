import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { OperatorComponent } from './component/operator/operator.component';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
  declarations: [OperatorComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIChartModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LongwallModule { }