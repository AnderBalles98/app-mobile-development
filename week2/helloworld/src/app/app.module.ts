import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewsService } from "./domain/news.service";
import { BrowseComponent } from "./browse/browse.component";
import { MinLenDirective } from "./directives/minlen.directive";
import { FavoritesComponent } from "./favorites/favorites.component";
import { FeaturedComponent } from "./featured/featured.component";
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import { SearchComponent } from "./search/search.component";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SettingsComponent } from "./settings/settings.component";
import { StoreComponent } from "./store/store.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule
    ],
    providers: [
        NewsService
    ],
    declarations: [
        AppComponent,
        BrowseComponent,
        MinLenDirective,
        FavoritesComponent,
        FeaturedComponent,
        HomeComponent,
        ProductComponent,
        SearchComponent,
        SearchFormComponent,
        SettingsComponent,
        StoreComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
