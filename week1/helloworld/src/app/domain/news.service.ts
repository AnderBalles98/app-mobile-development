import { Injectable } from "@angular/core";

@Injectable()
export class NewsService {
    private notices: Array<String> =[];

    add(notice: string):void {
        this.notices.push(notice);
    }

    search(): Array<String> {
        return this.notices;
    }

}