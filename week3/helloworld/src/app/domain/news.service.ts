import {Injectable} from "@angular/core";
import {getJSON, request} from "tns-core-modules/http";
import {HttpResponse} from "@nativescript/core";

const sqlite = require("nativescript-sqlite");

@Injectable()
export class NewsService {
    private apiUrl: string = "https://98c07bff3367.ngrok.io";
    private headersJSON = {
        "content-type": "application/json"
    };

    constructor() {
        this.getDb((db) => {
            console.dir(db);
            db.each("select * from logs", (err, fila) => {
                console.log("fila:", fila);
            }, (err, totales) => {
                console.log("Filas totales:", totales);
            });
        });
    }

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
        this.getDb((db) => {
            db.execSQL("insert into logs (texto) values(?)", [value], (err, id) => {
                console.log("Nuevo log id:", id);
            });
        });

        return getJSON(this.apiUrl + "/noticias?q=" + value);
    }

    delete(element: string): Promise<HttpResponse> {
        return request({
            url: this.apiUrl + "/noticias/delete/" + element,
            method: "post"
        });
    }

    fnError(db) {
        console.log("Error al obtener la base de datos");
    }

    getDb(fnOk, fnError = this.fnError) {
        const dataBaseName = "db_logs";

        return new sqlite(dataBaseName, (err, db) => {
            if (err) {
                console.log("Error al abrir:", dataBaseName, "Error:", err);
            } else {
                console.log("Conectado a:", dataBaseName);
                db.execSQL("create table if not exists logs (id integer primary key autoincrement, texto text)")
                    .then((id) => {
                        console.log("Tabla creada");
                        fnOk(db);
                    }, (error) => {
                        console.log("Error al crear la tabla", "Error:", error);
                        fnError(db);
                    });
            }
        });
    }

}
