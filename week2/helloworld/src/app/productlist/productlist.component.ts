import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NewsService } from "../domain/news.service";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("@nstudio/nativescript-pulltorefresh").PullToRefresh);


@Component({
    selector: "ProductList",
    templateUrl: "./productlist.component.html"
})
export class ProductListComponent implements OnInit {

    private text: string;

    constructor(private notices: NewsService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.notices.add("noticia 1");
        this.notices.add("noticia 2");
        this.notices.add("noticia 3");
    }

    onItemTap(x): void {
        console.dir(x);
    }

    refreshList(args) {
        const pullRefresh = args.object;
        setTimeout(function () {
           pullRefresh.refreshing = false;
        }, 1000);
   }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
