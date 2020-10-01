import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as appSetings from "tns-core-modules/application-settings";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
        appSetings.setBoolean("booleanTest", true);
        console.log(appSetings.getBoolean("booleanTest", false));
        appSetings.setString("stringTest", "Messi");
        console.log(appSetings.getString("stringTest", "Ronaldo"));
        appSetings.setNumber("numberTest", 89);
        console.log(appSetings.getNumber("numberTest", 105));
    }


    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
