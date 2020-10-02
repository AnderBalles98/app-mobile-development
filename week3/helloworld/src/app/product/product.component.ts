import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { NewsService } from "../domain/news.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import {Store} from "@ngrx/store";
import {AppState} from "~/app/app.module";
import {AddToReadNowAction, Noticia, SugerirNoticiaAction} from "~/app/domain/new-state.model";

@Component({
    selector: "ns-product",
    templateUrl: "./product.component.html"
})
export class ProductComponent implements OnInit {

    @Input() notice: string;
    @Input() isFavorite: boolean = false;
    @Output() deleteNoticeEmitter: EventEmitter<string> = new EventEmitter();
    private text: string;

    constructor(private routerExtensions: RouterExtensions, private notices: NewsService, private store: Store<AppState>) {
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

    setIsFavorite(): void {
        if (this.isFavorite) {
            this.notices.removeToFavorites(this.notice);
        } else {
            this.notices.addToFavorites(this.notice);
        }

        this.isFavorite = !this.isFavorite;

    }

    addToReadNow(): void {
        this.store.dispatch(new AddToReadNowAction(new Noticia(this.notice)));
        Toast.show({
            text: "Añadido a Leer Ahora En Home",
            duration: Toast.DURATION.SHORT
        });
    }

    setLikeSugerida(): void {
        this.store.dispatch(new SugerirNoticiaAction(new Noticia(this.notice)));
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
                                    Toast.show(toastOption);
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
