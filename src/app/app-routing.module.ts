import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { OperatorComponent } from './longwall/component/operator/operator.component';

const routes: Routes = [
    { path: "", redirectTo: "/operator", pathMatch: "full" },
    { path: "operator", component: OperatorComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
