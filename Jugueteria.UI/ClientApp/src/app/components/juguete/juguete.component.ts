import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-juguete',
  templateUrl: './juguete.component.html',
  styleUrls: ['./juguete.component.css']
})
export class JugueteComponent implements OnInit {

  listaJuguetes: any[] = [
    {id: 1, nombre: 'Robot', edad: '5', precio:'$52.55', compania: 'Mattel', descripcion:''},
    {id: 2, nombre: 'Robot2', edad: '15', precio:'$152.55', compania: 'Fisher', descripcion:'' }
  ];

  form: FormGroup;
  
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal) { 
    this.form = this.fb.group({
      nombre:['', [Validators.required, Validators.maxLength(50)]],
      precio:['', [Validators.required, Validators.maxLength(4)]],
      compania:['', [Validators.required, Validators.maxLength(50)]],
      edad:['', Validators.maxLength(3)],
      descripcion:['', Validators.maxLength(100)]
    })
  }

  ngOnInit(): void {
  }

  agregarJuguete(){
    const juguete: any = {
      nombre: this.form.get('nombre')?.value,
      precio: this.form.get('precio')?.value,
      compania: this.form.get('compania')?.value,
      edad: this.form.get('edad')?.value,
      descripcion: this.form.get('descripcion')?.value,
    }

    this.listaJuguetes.push(juguete);
    this.toastr.success('El juguete fue agragado con exito', 'Juguete Agregado');
    this.form.reset();
  }

  eliminarJuguete(index: number){
    this.listaJuguetes.splice(index, 1);
    this.toastr.success('El juguete fue eliminado con exito', 'Juguete Agregado');
  }

  closeResult = '';

  open(content: any, index: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.eliminarJuguete(index);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
