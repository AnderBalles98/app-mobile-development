import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { isAndroid, isIOS} from "tns-core-modules/platform";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    private text: string;

    constructor() {
        // Use the component constructor to inject providers.
        this.text = "You are using "
        if (isAndroid) {
            this.text +="Android";
        }else if (isIOS) {
            this.text+="IOS";
        }
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
