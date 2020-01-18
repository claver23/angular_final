import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/_model/Encuesta';
import { EncuestaService } from 'src/app/_services/encuesta.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  form: FormGroup;
  //encuestaFormControl: FormControl = new FormControl();

  constructor(
    private encuestaService : EncuestaService,
    private snack : MatSnackBar) { }

  ngOnInit() {

    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombres' : new FormControl('', [Validators.required]),
      'apePaterno' : new FormControl('', Validators.required),
      'apeMaterno': new FormControl('', Validators.required),
      'edad': new FormControl('', Validators.required),
      'profesion': new FormControl('', Validators.required),
      'lugarTrabajo': new FormControl('', Validators.required),
      'lenguajePreferido': new FormControl('', Validators.required)
    });

    this.encuestaService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

  }

  operar(){
    
    //TE ASEGURAS QUE EL FORM ESTE VALIDO PARA PROSEGUIR
    if(this.form.invalid){
      return;
    }

    let encuesta = new Encuesta();
    //encuesta.id = this.form.value['id'];
    encuesta.nombres = this.form.value['nombres'];
    encuesta.apePaterno = this.form.value['apePaterno'];
    encuesta.apeMaterno = this.form.value['apeMaterno'];
    encuesta.edad = this.form.value['edad'];
    encuesta.profesion = this.form.value['profesion'];
    encuesta.lugarTrabajo = this.form.value['lugarTrabajo'];
    encuesta.codLenguajeProgramacion = this.form.value['lenguajePreferido']

    this.encuestaService.registrar(encuesta).subscribe( () => {
      this.form.reset();
      this.encuestaService.mensajeCambio.next('SE REGISTRO');
    });
  }


}
