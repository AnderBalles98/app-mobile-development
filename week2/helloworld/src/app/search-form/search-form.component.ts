import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "SearchForm",
    moduleId: module.id,
    templateUrl: "./search-form.component.html",
})
export class SearchFormComponent implements OnInit {

    textFieldValue: string = "";

    @Output() search: EventEmitter<string> = new EventEmitter();

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onButtonTap(tag): void {
        this.search.emit(this.textFieldValue);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
