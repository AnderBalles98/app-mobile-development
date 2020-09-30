import { Component, OnInit, Input } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { NewsService } from "../domain/news.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "ns-product",
    templateUrl: "./product.component.html"
})
export class ProductComponent implements OnInit {

    private text: string;
    @Input() notice: string;


    constructor(private routerExtensions: RouterExtensions, private notices: NewsService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    doLater(fn) {
        setTimeout(fn, 100);
    }

    deleteNotice(notice: string): void {
        this.notices.delete(notice);
        this.doLater(() => {
            dialogs.alert({
                title: "Eliminar",
                message: notice + " se ha eliminado correctamente",
                okButtonText: "OK"
            });
        });
    }


    setNotice(currentNotice: string): void {
        const index = this.notices.indexOf(currentNotice);
        this.doLater(() => {
            dialogs.action({
                title: "Administrar Noticia",
                actions: ["Editar Noticia", "Eliminar Noticia"],
                cancelButtonText: "Cancelar"
            }).then((res) => {
                if (res === "Editar Noticia") {
                    this.doLater(() => {
                        dialogs.prompt({
                            title: "Modificar",
                            message: "Modifica la noticia",
                            defaultText: currentNotice,
                            okButtonText: "OK",
                            cancelButtonText: "Cancelar"
                        }).then((res) => {
                            if (res.result) {
                                const newNotice = res.text;
                                this.notices.search()[index] = newNotice;
                                const toastOption: Toast.ToastOptions = { text: "Modificación exitosa", duration: Toast.DURATION.SHORT };
                                this.doLater(() => {
                                    Toast.show(toastOption)
                                });
                            }
                        });
                    });
                } else if (res === "Eliminar Noticia") {
                    this.deleteNotice(currentNotice);
                }
            });
            
        });
    }

    onItemTap(x): void {
        console.dir(x);
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
