import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProductComponent } from "./product.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
    ],
    declarations: [
        ProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductModule { }
