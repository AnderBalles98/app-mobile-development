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
import {initilizeNoticiasState, NoticiasEffects, NoticiasState, reducersNoticias} from "~/app/domain/new-state.model";
import {ActionReducerMap} from "@ngrx/store";
import { StoreModule as NgRxStoreModule } from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";


// GLOBAL STATES
export interface AppState {
    noticias: NoticiasState; // ADD NoticiasState TO GLOBAL STATES
}

const reducers: ActionReducerMap<AppState> = {
    noticias: reducersNoticias // DEFINE REDUCER OF NoticiasState IN GLOBAL STATES
};

const reducersInitialState = {
    noticias: initilizeNoticiasState() // DEFINE Initializer OF NoticiasState IN GLOBAL STATES
}

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState, runtimeChecks: {
            strictActionImmutability: false, strictStateImmutability: false
            }}), // INTEGRATION OF GLOBAL STATE
        EffectsModule.forRoot([NoticiasEffects]) // ITEGRATION OF EFFECTS IN GLOBAL STATE
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
