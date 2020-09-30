import { Injectable } from "@angular/core";

@Injectable()
export class NewsService {
    private notices: Array<string> =[];

    add(notice: string):void {
        this.notices.push(notice);
    }

    search(): Array<string> {
        return this.notices;
    }

    indexOf(element: string): number {
        for (var i = 0; i < this.notices.length; i++) {
            if (element === this.notices[i]) {
                return i;
            }
        }
        return -1;
    }

    delete(element: string) {
        const index = this.indexOf(element);
        this.notices.splice(index, 1);
    }

}