import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CampoControlErroComponent } from './shared/campo-control-erro/campo-control-erro.component';
import { DropdownService } from './shared/services/dropdown.service';


@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,
    DataFormComponent,
    CampoControlErroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    DropdownService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
