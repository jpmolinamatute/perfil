import { Component, OnInit } from '@angular/core';
import '../perfillist/perfillist.component';
import '../materiallist/materiallist.component';
import { log } from 'util';

@Component({
    selector: 'app-perfil-screen',
    templateUrl: './perfil-screen.component.html',
    styleUrls: ['./perfil-screen.component.css']
})
export class PerfilScreenComponent implements OnInit {
    materialSelected: boolean;
    perfilSelected: boolean;
    category1 = {
        flange: 0,
        web: 0,
        section: ''
    };
    category2 = {
        flange: 0,
        web: 0,
        section: ''
    };
    constructor() { }

    ngOnInit() {
    }

    bothSelected() {
        return this.materialSelected && this.perfilSelected;
    }
    materialLisener(selected: boolean) {
        this.materialSelected = selected;
    }
    perfilLisener(selected: boolean) {
        this.perfilSelected = selected;
    }
}
