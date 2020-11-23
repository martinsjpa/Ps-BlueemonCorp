import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import {NavbarComponent} from '../layout/navbar/navbar.component';
export const routes: Routes = [
    { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
    {
        path: 'cadastro',
        component: NavbarComponent,
        children: [
            { path: '', component: CadastroComponent}
        ]
    },
]
