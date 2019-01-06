import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PerfilScreenComponent } from './perfil-screen/perfil-screen.component';
import { PerfilService } from './perfil.service';
@NgModule({
    declarations: [
        AppComponent,
        PerfilScreenComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [PerfilService],
    bootstrap: [AppComponent]
})
export class AppModule { }
