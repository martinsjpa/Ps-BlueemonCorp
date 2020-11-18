import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppComponent } from './app.component';
import { CadastroComponent } from './routes/cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CadastroService} from './services/cadastro.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule
    
  ],
  providers: [CadastroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
