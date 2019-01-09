import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Perfil } from '../../classes/perfil';
import { MetricLabel, PerfilData } from '../../classes/generics';
import { ServiceStatus } from '../../classes/serviceStatus';
import { PerfilService } from '../../services/perfil.service';

@Component({
    selector: 'app-perfillist',
    templateUrl: './perfillist.component.html',
    styleUrls: ['./perfillist.component.css']
})
export class PerfillistComponent implements OnInit {
    @Output() selected = new EventEmitter<boolean>();
    perfilSelected = false;
    perfilInstance: Perfil;
    perfilRow: PerfilData;
    perfilList: string[];
    perfilFile: SafeResourceUrl;
    fileName: string;

    constructor(private perfilservice: PerfilService, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        const listSubscriber = this.perfilservice.init();
        listSubscriber.subscribe((status: ServiceStatus) => {
            if (status.status === 'ready') {
                this.getPerfilList();
            }
        });
    }

    getPerfilList(): void {
        this.perfilList = this.perfilservice.getPerfilList();
    }

    setPerfil(perfil: string): void {
        if (perfil.length > 0) {
            const { _id, d, bf, tw, tf, r, area, weight } = this.perfilservice.getPerfil(perfil);
            this.perfilInstance = new Perfil(_id, d, bf, tw, tf, r, area, weight);
            this.perfilRow = this.perfilInstance.getData();
            this.perfilFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.perfilInstance.getBlob());
            this.fileName = `${perfil}.scr`;
            this.perfilSelected = true;
        } else {
            this.perfilSelected = false;
            this.perfilRow = undefined;
            this.perfilInstance = undefined;
            this.fileName = undefined;
            this.perfilFile = undefined;
        }
        this.selected.emit(this.perfilSelected);
    }

    getunit(unit: MetricLabel): string {
        console.log(unit);
        return '';
    }
}
