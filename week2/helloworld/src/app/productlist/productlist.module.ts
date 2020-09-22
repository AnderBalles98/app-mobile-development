import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProductListRoutingModule } from "./productlist-routing.module";
import { ProductListComponent } from "./productlist.component";
import { ProductComponent } from "../product/product.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductListRoutingModule
    ],
    declarations: [
        ProductListComponent,
        ProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductListModule { }
