import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {NewsService} from "../domain/news.service";
import {View, Color} from "tns-core-modules/ui/page";
import * as Toast from "nativescript-toasts";
import * as dialogs from "tns-core-modules/ui/dialogs";
import Instance = WebAssembly.Instance;

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {

    notices: NewsService;
    noticesToShow: Array<string>;
    @ViewChild("stackLayout", null) layout: ElementRef;

    constructor(notices: NewsService) {
        // Use the component constructor to inject providers.
        this.notices = notices;
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.getSearchFromChild("");
    }

    doLater(fn) {
        setTimeout(fn, 100);
    }

    addNotice(notice: string) {
        this.notices.add(notice);
    }

    deleteNotice(notice: string): void {
        this.notices.delete(notice).then((response) => {
            console.log("delete");
            console.log(response);
            const statusCode = response.statusCode;
            console.log(statusCode);
            const result = response.content.toJSON();
            console.log(result);
            this.noticesToShow = result.noticias;
            this.doLater(() => {
                dialogs.alert({
                    title: "Eliminar",
                    message: notice + " se ha eliminado correctamente",
                    okButtonText: "OK"
                });
            });
        });
    }


    onItemTap(x): void {
        console.dir(x);
    }

    getSearchFromChild(search: string) {
        let valueToSearch: string = "";
        if (search.length > 2) {
            valueToSearch = search;
        }
        this.notices.search(search).then((result: any) => {
            console.log(result);
            this.noticesToShow = result.noticias;
        }, (error) => {
            console.log(error);
            Toast.show({
                text: "Error en la búsqueda",
                duration: Toast.DURATION.SHORT
            });
        });

        const layout = <View>this.layout.nativeElement;
        layout.animate({
            backgroundColor: new Color("blue"),
            duration: 300,
            delay: 150
        }).then(() => layout.animate({
            backgroundColor: new Color("white"),
            duration: 300,
            delay: 150
        }));
    }

    refreshList(args) {
        const pullRefresh = args.object;
        setTimeout(() => {
            pullRefresh.refreshing = false;
        }, 1000);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
