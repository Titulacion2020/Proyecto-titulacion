import {TratamientoService } from './../../../../services/tratamiento/tratamiento.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { TratamientoMInterface } from './../../../../models/tratamiento.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteInterface } from 'src/app/models/paciente-model';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-new-tratamiento',
  templateUrl: './new-tratamiento.component.html',
  styleUrls: ['./new-tratamiento.component.css']
})
export class NewTratamientoComponent implements OnInit {

  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));

  TratamientoMform = new FormGroup({
    id: new FormControl(null),
    seguro: new FormControl(''),
    namepaciente: new FormControl(''),
    especialidad: new FormControl('', Validators.required),
    cipaciente: new FormControl('',  Validators.required),
    odontologo: new FormControl('',  Validators.required),
    fecha: new FormControl('',  Validators.required),
    tratamiento: new FormControl('',  Validators.required),
    precio: new FormControl(''),
    //noaplica_seguro: new FormControl(''),
    observacion: new FormControl(''),
  });

  filteredOptions: Observable<string[]>;
  minDate: Date = new Date();
  specialtiesSelected: string;
  pacientes: PacienteInterface[];
  pacient: PacienteInterface = {};
  odontEspecialidad: any[] = [];
  allHours = [];
  dateSelected: Date;
  dentistselected: any;
  registeredMedicalTratamientos: TratamientoMInterface[] = [];

  constructor(
    private toastr: ToastrService,
    public espeService: EspecialidadService,
    public pactService: PacienteService,
    private dateAdapter: DateAdapter<Date>,
    private tratamientoMService: TratamientoService,
    public odontService: OdontologoService,
    private dialogRef: MatDialogRef<NewTratamientoComponent>,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    this.dateAdapter.setLocale('es');
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getRegisteredMedicalTratamientos();
    this.filteredOptions = this.TratamientoMform.get('cipaciente').valueChanges.pipe(
      startWith(''),
      map(value =>  value ? this._filter(value) : this.pactService.arrayPacientes.slice())
    );
  }

    getRegisteredMedicalTratamientos() {
    this.tratamientoMService.getAllTratamientosMedicos().subscribe(rest => {
      this.registeredMedicalTratamientos = rest;
    }, error => {
      throw error;
    });
  }

  displayFn(subject) {
    return subject ? subject.cedula : undefined;
  }

  private _filter(value: any): string[] {
    const filterValue = value;
    this.setpacientvalue(value);
    return this.pactService.arrayPacientes.filter(option => option.cedula.indexOf(filterValue) === 0);
  }

  setpacientvalue(value: any) {
    this.TratamientoMform.get('namepaciente').setValue(value.nombre);
    this.TratamientoMform.get('seguro').setValue(value.seguro);
  }

  selectedMedico(dentistselected: any) {
    if (dentistselected) {
        this.dentistselected =  dentistselected;
    }
  }  


  especialidad(val: any) {
    this.odontEspecialidad = [];
    this.specialtiesSelected = val;
    this.odontService.arrayOdontologos.map((odont) => {
      if (odont.especialidad === val) {
        this.odontEspecialidad.push(odont);
      }
    });
  }

  selectFecha(date: any) {
    this.dateSelected = date;
  }

  guardarTratamientoMedico(data: TratamientoMInterface) {
    const fecha = Date.parse(data.fecha);
    data.fecha = fecha;
    // objeto modificado
    let newdata: TratamientoMInterface;
    newdata = data;

    if (newdata.cipaciente) {

      if (this.existID_pacientList(newdata.cipaciente) === true) {
        newdata.cipaciente =  newdata.cipaciente.cedula;
        newdata.odontologo =  newdata.odontologo.cedula;
        newdata.nameodontologo = this.dentistselected.nombre;
        this.tratamientoMService.addTratamientoM(newdata);
        this.toastr.success('Registro guardado exitosamente', 'MENSAJE');
        this.close();
      } else {
        this.toastr.error('El paciente  no se encuentra registrado', 'MENSAJE');
      }
    } else {
      console.log('el no se encuentra registrado');
    }
  }

  existID_pacientList(cedula: any): boolean {
    let exist = false;
    if (cedula) {
      const pacientFiltered = this.pactService.arrayPacientes.find(pacientFilterbycedula => pacientFilterbycedula.cedula === cedula.cedula);
      if (pacientFiltered) {
        exist = true;
      } else {
        exist = false;
      }
    } else {
      exist = false;
    }
    return exist;
  }

  close(): void {
    this.dialogRef.close();
  }

  check(event: KeyboardEvent) {
    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }

  getErrorMessageP() {
    return  this.TratamientoMform.get('cipaciente').hasError('required') ? 'Seleccione el paciente' : '';
  }

  getErrorMessageE() {
    return  this.TratamientoMform.get('especialidad').hasError('required') ? 'Seleccione la especialidad' : '';
  }

  getErrorMessageF() {
    return  this.TratamientoMform.get('fecha').hasError('required') ? 'Fecha incorrecta' : '';
  }

  getErrorMessageO() {
    return  this.TratamientoMform.get('odontologo').hasError('required') ? 'Seleccione el odontologo' : '';
  }


}