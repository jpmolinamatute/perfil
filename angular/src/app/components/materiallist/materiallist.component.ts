import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceStatus } from '../../classes/serviceStatus';
import { MaterialService } from '../../services/material.service';
import { MaterialRawData } from '../../classes/generics';

@Component({
    selector: 'app-materiallist',
    templateUrl: './materiallist.component.html',
    styleUrls: ['./materiallist.component.css']
})
export class MateriallistComponent implements OnInit {
    @Output() selected = new EventEmitter<boolean>();
    materialSelected = false;
    materialList: string[];
    materialRow: MaterialRawData;
    constructor(private materialservice: MaterialService) { }

    ngOnInit(): void {
        const listSubscriber = this.materialservice.init();
        listSubscriber.subscribe((status: ServiceStatus) => {
            if (status.status === 'ready') {
                this.getMaterialList();
            }
        });
    }
    getMaterialList(): void {
        this.materialList = this.materialservice.getMaterialList();
    }
    setMaterial(material: string): void {
        if (material.length > 0) {
            this.materialRow = this.materialservice.getMaterial(material);
            this.materialSelected = true;
        } else {
            this.materialSelected = false;
        }
        this.selected.emit(this.materialSelected);
    }
}
