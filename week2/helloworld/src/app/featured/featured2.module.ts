import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Featured2RoutingModule } from "./featured2-routing.module";
import { FeaturedComponent } from "./featured.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Featured2RoutingModule
    ],
    declarations: [
        FeaturedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Featured2Module { }
