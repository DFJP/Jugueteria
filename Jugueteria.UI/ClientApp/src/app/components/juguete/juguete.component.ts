import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JugueteService } from 'src/app/services/juguete.service';

@Component({
  selector: 'app-juguete',
  templateUrl: './juguete.component.html',
  styleUrls: ['./juguete.component.css']
})
export class JugueteComponent implements OnInit {

  listaJuguetes: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _jugueteService: JugueteService) { 
    this.form = this.fb.group({
      nombre:['', [Validators.required, Validators.maxLength(50)]],
      precio:['', [Validators.required, Validators.max(1000)]],
      compania:['', [Validators.required, Validators.maxLength(50)]],
      edad:['', Validators.max(100)],
      descripcion:['', Validators.maxLength(100)]
    })
  }

  ngOnInit(): void {
    this.obtenerJuguetes();
  }

  obtenerJuguetes(){
    this._jugueteService.getListJuguetes().subscribe(data => {
      console.log(data);
      this.listaJuguetes = data;
    }, error => {
      console.log(error);
    });
  }

  guardarJuguete(){

    const juguete: any = {
      nombre: this.form.get('nombre')?.value,
      precio: this.form.get('precio')?.value,
      compania: this.form.get('compania')?.value,
      restriccionedad: this.form.get('edad')?.value,
      descripcion: this.form.get('descripcion')?.value,
    }

    if(this.id == undefined){
      this._jugueteService.saveJuguete(juguete).subscribe(data => {
        this.toastr.success('El juguete fue agragado con exito', 'Juguete Agregado');
        this.obtenerJuguetes();
        this.form.reset();
      }, error => {
        this.toastr.error('El juguete No se pudo agregar', 'Error Agregar Juguete');
        console.log(error);
      });
    } else{
      juguete.id = this.id;
      this._jugueteService.updateJuguete(this.id, juguete).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.success('El juguete fue actualizado con exito', 'Juguete Actualizado');
        this.obtenerJuguetes();
      }, error => {
        this.toastr.error('El juguete No se pudo agregar', 'Error Agregar Juguete');
        console.log(error);
      });
    }    
  }

  eliminarJuguete(id: number){
    this._jugueteService.deleteJuguete(id).subscribe(data => {
      this.toastr.success('El juguete fue eliminado con exito', 'Juguete Agregado');
      this.obtenerJuguetes();
    }, error => {
      this.toastr.error('El juguete No se pudo eliminar', 'Error Eliminar Juguete');
      console.log(error);
    });    
  }

  editarJuguete(juguete: any){
    this.accion = 'Editar';
    this.id = juguete.id;
    this.form.patchValue({
      nombre: juguete.nombre,
      precio: juguete.precio,
      compania: juguete.compania,
      edad:juguete.restriccionEdad,
      descripcion: juguete.descripcion
    })
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
