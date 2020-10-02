import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { isAndroid, isIOS} from "tns-core-modules/platform";
import * as app from "tns-core-modules/application";
import {Store} from "@ngrx/store";
import {AppState} from "~/app/app.module";
import {Noticia} from "~/app/domain/new-state.model";
import {NewsService} from "~/app/domain/news.service";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    private text: string;
    noticesToRead: Array<string>;
    favorites: Array<string>;

    constructor(private store: Store<AppState>, private notices: NewsService) {
        // Use the component constructor to inject providers.
        this.text = "You are using "
        if (isAndroid) {
            this.text +="Android";
        }else if (isIOS) {
            this.text+="IOS";
        }
        this.notices.getFavorites((errr, rows) => {
            this.favorites = rows.map((row) => {
                return row[0];
            });
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.store.select((state) => {
            return state.noticias.readNow;
        }).subscribe((noticiasToReadNow: Noticia[]) => {
            this.noticesToRead = noticiasToReadNow.map((noticia: Noticia) => {
                return noticia.titulo;
            });
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
