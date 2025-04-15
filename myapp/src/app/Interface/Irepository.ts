import { Observable } from "rxjs";

export interface Irepository {

    db: any; 
    entity: any;
    status: string;

    read(entityName: string): Observable<any[]>;
    save(entityName: string, entity: any): Observable<any[]>; 
    delete(entityName: string, entity: any): Observable<any[]>; 
}