import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as appSetings from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    username: string;

    constructor() {
        // Use the component constructor to inject providers.
        appSetings.setBoolean("booleanTest", true);
        console.log(appSetings.getBoolean("booleanTest", false));
        appSetings.setString("stringTest", "Messi");
        console.log(appSetings.getString("stringTest", "Ronaldo"));
        appSetings.setNumber("numberTest", 89);
        console.log(appSetings.getNumber("numberTest", 105));
    }

    doLater(fn) {
        setTimeout(fn, 100);
    }

    ngOnInit(): void {
        this.getName();
    }

    getName(): void {
        this.username = appSetings.getString("username", "user1156");
    }

    setName(username: string): void {
        appSetings.setString("username", username);
    }

    setUsername() {
        dialogs.prompt({
            title: "Modificar username",
            defaultText: this.username,
            okButtonText: "OK",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.result) {
                const newUsername = result.text;
                this.setName(newUsername);
                this.getName();
                this.doLater(() => {
                    Toast.show({
                        text: "Username modificado exitosamente",
                        duration: Toast.DURATION.SHORT
                    });
                });
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
