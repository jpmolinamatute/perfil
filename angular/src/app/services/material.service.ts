import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceStatus } from '../classes/serviceStatus';
import { environment } from '../../environments/environment';
import { MaterialRawData } from '../classes/generics';
@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private readonly baseURL = `${environment.apiURL}/api/materiallist`;
    private list: MaterialRawData[] = [];
    private iSeeYou: Observable<ServiceStatus>;

    constructor(private http: HttpClient) {
        this.iSeeYou = new Observable((observer) => {
            observer.next({ status: 'calling' });
            this.http.get(this.baseURL).subscribe((data: MaterialRawData[]) => {
                this.list = data;
                observer.next({ status: 'ready' });
                observer.complete();
            });
        });
    }
    init(): Observable<ServiceStatus> {
        return this.iSeeYou;
    }
    getMaterialList(): string[] {
        const info = [];
        this.list.forEach((item) => info.push(item._id));
        return info;
    }
    getMaterial(_id: string): MaterialRawData {
        let info: MaterialRawData;
        this.list.forEach((item) => {
            if (item._id === _id) {
                info = item;
            }
        });
        return info;
    }
}
