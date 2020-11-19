import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/services/cadastro.service';
import {Employee} from 'src/app/models/Employee'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  formEdit: FormGroup;

  employees: Array<Employee> = new Array<Employee>();

  employeeId: string = null;

  @ViewChild('modalEditEmployee', { static: false }) modalEditEmployee: TemplateRef<any>;
  modalEditEmployeeRef: BsModalRef;
  constructor(private cadastroService:CadastroService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getEmployee();
    this.initFormGroupCreate();
    

  }

  initFormGroupCreate()
  {
    this.form = new FormGroup({
      nome: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      cpf: new FormControl(null,Validators.required),
      salario: new FormControl(null,Validators.required),
      dataNasc: new FormControl(null,Validators.required)
    });

  }
  initFormGroupEdit(employee:Employee)
  {
    this.formEdit = new FormGroup({
      nome: new FormControl(employee.nome,Validators.required),
      email: new FormControl(employee.email,Validators.required),
      cpf: new FormControl(employee.cpf,Validators.required),
      salario: new FormControl(employee.salario,Validators.required),
      dataNasc: new FormControl(employee.dataNasc,Validators.required)
    });
  }

    getEmployee() {
    this.cadastroService.get().subscribe(
      (response) => {
        Object.assign(this.employees, response);
        console.log(this.employees);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createEmployee() {
    let employeeForm = this.form.value as Employee;
    this.cadastroService.save(employeeForm).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEmployee(employee: Employee) {
    this.cadastroService.delete(employee._id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editEmployee() {
    let employee = this.formEdit.value as Employee
    employee._id = this.employeeId;
    debugger
    this.cadastroService.edit(employee).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModalEditEmployee(employee: Employee) {
    this.employeeId = employee._id; 

    let config = {
      keyboard: false,
      ignoreBackdropClick: true
    };

    this.modalEditEmployeeRef = this.modalService.show(this.modalEditEmployee, config);
    this.initFormGroupEdit(employee);
  }
  closeModal(modalRef: BsModalRef)
  {
    modalRef.hide();
  }

}
