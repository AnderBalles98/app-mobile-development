import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NewsService } from "../domain/news.service";
import { View, Color } from "tns-core-modules/ui/page";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {

    notices: NewsService;
    noticesToShow: string[];
    @ViewChild("stackLayout", null) layout: ElementRef;

    constructor(notices: NewsService) {
        // Use the component constructor to inject providers.
        this.notices = notices;
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.addNotice();
        this.addNotice();
        this.getSearchFronChild("");
    }

    addNotice() {
        this.notices.add("noticia " + (this.notices.search().length+1));
    }

    onItemTap(x): void {
        console.dir(x);
    }

    getSearchFronChild(search: string) {
        if (search.length > 2) {
            this.noticesToShow = this.notices.search().filter((notice) => {
                return notice.includes(search);
            });
        }else {
            this.noticesToShow = this.notices.search();
        }

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
            this.addNotice();
        }, 1000);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
