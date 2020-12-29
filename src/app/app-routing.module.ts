import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ShearerModule } from "./shearer/shearer.module.tns";
import { ShearerComponent } from "./shearer/components/shearer/shearer.component";

const routes: Routes = [
    { path: "", redirectTo: "/shearer", pathMatch: "full" },
    { path: "shearer", component: ShearerComponent },
    // { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
