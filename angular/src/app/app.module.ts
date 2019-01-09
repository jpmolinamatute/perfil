import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PerfilScreenComponent } from './components/perfil-screen/perfil-screen.component';
import { PerfilService } from './services/perfil.service';
import { PerfillistComponent } from './components/perfillist/perfillist.component';
import { MateriallistComponent } from './components/materiallist/materiallist.component';
@NgModule({
    declarations: [
        AppComponent,
        PerfilScreenComponent,
        PerfillistComponent,
        MateriallistComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [PerfilService],
    bootstrap: [AppComponent]
})
export class AppModule { }
