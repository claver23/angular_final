import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/_services/encuesta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Encuesta } from 'src/app/_model/Encuesta';
import { EncuestasComponent } from '../encuestas.component';

@Component({
  selector: 'app-encuesta-edicion',
  templateUrl: './encuesta-edicion.component.html',
  styleUrls: ['./encuesta-edicion.component.css']
})
export class EncuestaEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;

  encuestaSeleccionada: Encuesta;

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private encuestaService : EncuestaService,
    private encuestasComponent: EncuestasComponent) { }

  ngOnInit() {

    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombres' : new FormControl('', Validators.required),
      'apePaterno' : new FormControl('', Validators.required),
      'apeMaterno': new FormControl('', Validators.required),
      'edad': new FormControl('', Validators.required),
      'profesion': new FormControl('', Validators.required),
      'lugarTrabajo': new FormControl('', Validators.required),
      'lenguajePreferido': new FormControl('', Validators.required),
      'fechaCreacion': new FormControl('', Validators.required),
      'usernameCreacion': new FormControl('', Validators.required),
      'fechaModificacion': new FormControl(''),
      'usernameModificacion': new FormControl('')      
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //this.edicion = params['id'] != null;
      //this.initForm();

      this.encuestaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id' : new FormControl(data.id),
          'nombres' : new FormControl(data.nombres),
          'apePaterno' : new FormControl(data.apePaterno),
          'apeMaterno': new FormControl(data.apeMaterno),
          'edad': new FormControl(data.edad),
          'profesion': new FormControl(data.profesion),
          'lugarTrabajo': new FormControl(data.lugarTrabajo),
          'lenguajePreferido': new FormControl(data.codLenguajeProgramacion),
          'fechaCreacion': new FormControl(data.fechaCreacion),
          'usernameCreacion': new FormControl(data.usernameCreacion),
          'fechaModificacion': new FormControl(data.fechaModificacion),
          'usernameModificacion': new FormControl(data.usernameModificacion) 
        });
      });

    });
    
  }

  operar(){

    if(this.form.invalid){
      return;
    }

    let encuesta = new Encuesta();
    encuesta.id = this.form.value['id'];
    encuesta.nombres = this.form.value['nombres'];
    encuesta.apePaterno = this.form.value['apePaterno'];
    encuesta.apeMaterno = this.form.value['apeMaterno'];
    encuesta.edad = this.form.value['edad'];
    encuesta.profesion = this.form.value['profesion'];
    encuesta.lugarTrabajo = this.form.value['lugarTrabajo'];
    encuesta.codLenguajeProgramacion = this.form.value['lenguajePreferido']
    encuesta.fechaCreacion = this.form.value['fechaCreacion']
    encuesta.usernameCreacion = this.form.value['usernameCreacion']
    encuesta.fechaModificacion = this.form.value['fechaModificacion']
    encuesta.usernameModificacion = this.form.value['usernameModificacion']

    this.encuestaService.modificar(encuesta).subscribe( () => {
      this.encuestaService.listarTodosPaginado(0, this.encuestasComponent.pageSize).subscribe(data => {
        this.encuestaService.encuestaCambio.next(data);
        this.encuestaService.mensajeCambio.next('SE MODIFICO');
      });
    });

    this.router.navigate(['/app/encuestas']);
  }

}
