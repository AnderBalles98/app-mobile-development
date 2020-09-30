import { Injectable } from "@angular/core";
import { getJSON, request } from "tns-core-modules/http";
import { HttpResponse } from "@nativescript/core";

@Injectable()
export class NewsService {
    private apiUrl: string = "https://5b9d1269fbfb.ngrok.io";
    private headersJSON = {
        "content-type": "application/json"
    };

    add(notice: string): Promise<HttpResponse> {
        return request({
            url: this.apiUrl + "/noticias/add",
            method: "post",
            headers: this.headersJSON,
            content: JSON.stringify({
                notice
            })
        });
    }

    search(value: string): Promise<unknown> {
        return getJSON(this.apiUrl + "/noticias?q=" + value);
    }

    delete(element: string): Promise<HttpResponse> {
        return request({
            url: this.apiUrl + "/noticias/delete/" + element,
            method: "post"
        });
    }

}
