import { Component, OnInit } from '@angular/core';
import { Perfil } from '../classes/perfil';
import { MetricLabel, PerfilData } from '../classes/generics';
import { PerfilService } from '../perfil.service';
import { ServiceStatus } from '../classes/serviceStatus';

@Component({
    selector: 'app-perfil-screen',
    templateUrl: './perfil-screen.component.html',
    styleUrls: ['./perfil-screen.component.css']
})
export class PerfilScreenComponent implements OnInit {
    perfilSelected: Perfil;
    perfilRow: PerfilData;
    perfilList: string[];
    constructor(private perfilservice: PerfilService) { }

    ngOnInit() {
        const listSubscriber = this.perfilservice.init();
        listSubscriber.subscribe((status: ServiceStatus) => {
            if (status.status === 'ready') {
                this.getPerfilList();
            }
        });
    }
    getPerfilList() {
        this.perfilList = this.perfilservice.getPerfilList();
    }
    getunit(unit: MetricLabel): string {
        console.log(unit);
        return '';
    }
}
