import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {NewsService} from "~/app/domain/news.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Favorites",
    templateUrl: "./favorites.component.html"
})
export class FavoritesComponent implements OnInit {

    favorites: Array<string>;

    constructor(private notices: NewsService) {
        // Use the component constructor to inject providers.
        this.getFavorites();
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getFavorites() {
        this.notices.getFavorites((errr, rows) => {
            this.favorites = rows.map((row) => {
                return row[0];
            });
        });
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.getFavorites();
        setTimeout(() => {
            pullRefresh.refreshing = false;
        }, 1000);
    }
}
