import { Injectable } from "@angular/core";
import { getJSON, request } from "tns-core-modules/http";
import { HttpResponse } from "@nativescript/core";

const sqlite = require("nativescript-sqlite");

@Injectable()
export class NewsService {

    favorites: Array<string>;
    private apiUrl: string = "https://fd0ba59d5864.ngrok.io";
    private headersJSON = {
        "content-type": "application/json"
    };

    constructor() {
        this.getDb((db) => {
            console.dir(db);
            db.each("select * from logs",  (err, fila) => {
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

    addToFavorites(notice: string): void {
        this.getDb((db) => {
            db.execSQL("insert into favorites (noticia) values(?)", [notice], (err, id) => {
                console.log("Nuevo favorito id:", id);
            });
        });
    }

    removeToFavorites(notice: string): void {
        this.getDb((db) => {
            db.execSQL("delete from favorites where noticia like ?", [notice], (err, id) => {
                console.log("Eliminado de favoritos");
            });
        });
    }

    getFavorites(callback): Promise<unknown> {
        let toReturn: Array<string> = [];

        return this.getDb((db) => {
            return (db.all("select noticia from favorites", callback));
        });
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
                    .then(() => {
                        console.log("Tabla creada: logs");
                        db.execSQL("create table if not exists favorites (id integer primary key autoincrement, noticia text)")
                            .then(() => {
                                console.log("Tabla creada: favorites");
                                fnOk(db);
                            }, (error) => {
                                console.log("Error al crear la tabla favorites", "Error:", error);
                                fnError(db);
                            });
                    }, (error) => {
                        console.log("Error al crear la tabla logs", "Error:", error);
                        fnError(db);
                    });
            }
        });
    }

}
