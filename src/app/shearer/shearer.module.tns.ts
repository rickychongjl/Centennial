import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ShearerComponent } from './components/shearer/shearer.component';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
  declarations: [ShearerComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIChartModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ShearerModule { }
