import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NewsService } from "../domain/news.service";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {

    constructor(private notices:NewsService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.notices.add("hola!");
        this.notices.add("hola2!");
        this.notices.add("hola3!");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
