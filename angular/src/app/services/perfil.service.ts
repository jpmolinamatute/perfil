import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceStatus } from '../classes/serviceStatus';
import { PerfilRawData } from '../classes/generics';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private readonly baseURL = `${environment.apiURL}/api/perfillist`;
    private list: PerfilRawData[] = [];
    private iSeeYou: Observable<ServiceStatus>;

    constructor(private http: HttpClient) {
        this.iSeeYou = new Observable((observer) => {
            observer.next({ status: 'calling' });
            this.http.get(this.baseURL).subscribe((data: PerfilRawData[]) => {
                this.list = data;
                observer.next({ status: 'ready' });
                observer.complete();
            });
        });
    }
    init(): Observable<ServiceStatus> {
        return this.iSeeYou;
    }
    getPerfilList(): string[] {
        const info = [];
        this.list.forEach((item) => info.push(item._id));
        return info;
    }
    getPerfil(_id: string): PerfilRawData {
        let info: PerfilRawData;
        this.list.forEach((item) => {
            if (item._id === _id) {
                info = item;
            }
        });
        return info;
    }
}
