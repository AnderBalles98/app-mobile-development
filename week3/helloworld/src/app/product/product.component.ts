import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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

    @Input() notice: string;
    private text: string;
    @Output() deleteNoticeEmitter: EventEmitter<string> = new EventEmitter();


    constructor(private routerExtensions: RouterExtensions, private notices: NewsService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    doLater(fn) {
        setTimeout(fn, 100);
    }

    emitDeleteNotice(notice: string): void {
        this.deleteNoticeEmitter.emit(notice);
    }


    setNotice(currentNotice: string): void {
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
                        }).then((result) => {
                            if (result.result) {
                                const newNotice = result.text;
                                const toastOption: Toast.ToastOptions = {
                                    text: "Modificación exitosa",
                                    duration: Toast.DURATION.SHORT
                                };
                                this.doLater(() => {
                                    Toast.show(toastOption)
                                });
                            }
                        });
                    });
                } else if (res === "Eliminar Noticia") {
                    this.emitDeleteNotice(currentNotice);
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
