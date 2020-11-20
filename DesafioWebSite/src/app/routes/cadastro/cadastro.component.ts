import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/services/cadastro.service';
import {Employee} from 'src/app/models/Employee'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  // formulário criação de colaborador
  form: FormGroup;
  // formulário edição de colaborador
  formEdit: FormGroup;


  // varíavel responsável por alterar o estado de visualização da criação de colaborador
  employeeCreate = false;

  /* Responsável pela paginação da listagem de colaboradores */
  page: number = 1;

  /* Responsável por controlar a quantidade de colaboradores por pagina */
  itemsPage: number = 7;

  // variável responsável por guardar todos os colaboradores
  employees: Array<Employee> = new Array<Employee>();

  // variável que auxilia na edição do employee
  employeeId: string = null;

  //ViewChild para a modal
  @ViewChild('modalEditEmployee', { static: false }) modalEditEmployee: TemplateRef<any>;
  // Referencia para a modal
  modalEditEmployeeRef: BsModalRef;
  constructor(private cadastroService:CadastroService, private modalService: BsModalService)  { }

  ngOnInit(): void {
    this.getEmployee();
    this.initFormGroupCreate();
    

  }

  /**Inicia o formulário de criação de colaborador */ 
  initFormGroupCreate()
  {
    this.form = new FormGroup({
      nome: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      cpf: new FormControl(null,Validators.required),
      salary: new FormControl(null,Validators.required),
      dateBirth: new FormControl(null,Validators.required)
    });

  }

  /**Inicia o formulário de edição de colaborador */ 
  initFormGroupEdit(employee:Employee)
  {
    this.formEdit = new FormGroup({
      nome: new FormControl(employee.nome,Validators.required),
      email: new FormControl(employee.email,Validators.required),
      cpf: new FormControl(employee.cpf,Validators.required),
      salary: new FormControl(employee.salary,Validators.required),
      dateBirth: new FormControl(employee.dateBirth,Validators.required)
    });
  }

    /**Faz a chamada para a Api e recebe todos os colaboradores */ 
    getEmployee() {
    this.cadastroService.get().subscribe(
      (response) => {
        Object.assign(this.employees, response);
      },
      (error) => {
        Swal.fire('Error', 'Não foi possível Carregar os Colaboradores', 'error');
      }
    );
  }
  /**Envia para a Api o novo colaborador para que ela faça a criação */ 
  saveEmployee() {
    let employeeForm = this.form.value as Employee;
    employeeForm.dateBirth = new Date(employeeForm.dateBirth).toLocaleDateString();
    this.cadastroService.save(employeeForm).subscribe(
      (response) => {
        Swal.fire('Success', 'Colaborador Cadastrado com Sucesso', 'success');
        this.getEmployee();
      },
      (error) => {
        Swal.fire('Error', 'Não foi possível Cadastrar o Colaborador', 'error');
      }
    );
  }
  /**Envia para a Api o colaborador que foi deletado */ 
  deleteEmployee(employee: Employee) 
  {
    Swal.fire({
      text: `Deseja mesmo Deletar o colaborador ${employee.nome}?`,
      icon:"warning",
      confirmButtonColor: "#f05050",
      confirmButtonText: "Deletar Colaborador",
      cancelButtonColor: "Cancelar",
      iconHtml:'<i class="fas fa-trash"',
      iconColor: "#f05050",
      showCancelButton: true,
    }).then((result) =>
    {
      if(result.value)
      {
        this.cadastroService.delete(employee._id).subscribe(
          (response) => {
            let find = this.employees.find(x => x._id == employee._id);
            let index = this.employees.indexOf(find);
            this.employees.splice(index,1);
            Swal.fire('Success', 'Colaborador Excluido com Sucesso', 'success');
            
          },
          (error) => {
            Swal.fire('Error', 'Não foi possível Excluir o Colaborador', 'error');
          }
        );
      }
    });

  }

  /**Envia para a api o colaborador que foi editado e suas alterações */ 
  editEmployee() {
    this.closeModal(this.modalEditEmployeeRef);

    let employee = this.formEdit.value as Employee;
    employee.dateBirth = new Date(employee.dateBirth).toLocaleDateString();
    employee._id = this.employeeId;
    this.cadastroService.edit(employee).subscribe(
      (response) => {
        Swal.fire('Success', 'Colaborador Editado com Sucesso', 'success');
        this.getEmployee();
      },
      (error) => {
        Swal.fire('Error', 'Não foi possível editar o Colaborador', 'error');
      }
    );
  }

  /**Abre a modal de edição de employee */ 
  openModalEditEmployee(employee: Employee) {
    this.employeeId = employee._id;
    let config = {
      keyboard: false,
      ignoreBackdropClick: true
    };

    this.modalEditEmployeeRef = this.modalService.show(this.modalEditEmployee, config);
    this.initFormGroupEdit(employee);

  }
  /**Fecha a modal */ 
  closeModal(modalRef: BsModalRef)
  {
    modalRef.hide();
  }

  /** Controla a varíavel createEmployee e a quantidade de colaboradores por pagina */
  controlPageAndCreate()
  {
    if(!this.employeeCreate){
      this.itemsPage = 4;
    } 
    else{
      this.itemsPage = 7;
    }
    this.employeeCreate = !this.employeeCreate;

      


  }

}
