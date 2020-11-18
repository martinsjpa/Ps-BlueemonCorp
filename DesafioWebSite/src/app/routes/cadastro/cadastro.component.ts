import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  constructor(private cadastroService:CadastroService) { }

  ngOnInit(): void {
    this.getEmployee();
    this.initFormGroup();
    

  }

  initFormGroup()
  {
    this.form = new FormGroup({
      nome: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      cpf: new FormControl(null,Validators.required),
      salario: new FormControl(null,Validators.required),
      dataNasc: new FormControl(null,Validators.required)
    });

  }

    getEmployee() {
    this.cadastroService.get().subscribe(
      (response) => {
        let rawData = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
