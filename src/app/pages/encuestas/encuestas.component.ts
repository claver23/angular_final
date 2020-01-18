import { Component, OnInit, ViewChild } from '@angular/core';
import { Encuesta } from 'src/app/_model/Encuesta';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { EncuestaService } from 'src/app/_services/encuesta.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  pageSize: number = 10;
  totalRows: number = 0;
  pageIndex: number = 0;
  dataSource: MatTableDataSource<Encuesta>;
  displayedColumns = ['id', 'nombres', 'apePaterno', 'apeMaterno', 'edad', 'profesion', 'lugarTrabajo', 'codLenguajeProgramacion', 
    'fechaCreacion', 'usernameCreacion', 'fechaModificacion', 'usernameModificacion', 'acciones'];

  @ViewChild(MatSort/*, {static: true}*/) sort: MatSort;
  @ViewChild(MatPaginator/*, { static: true }*/) paginator: MatPaginator;
  
  constructor(
    private encuestaService : EncuestaService,
    private snack : MatSnackBar) { }

  ngOnInit() {

    console.log('encuestas.component.ts ngOnInit!')
    
    this.encuestaService.encuestaCambio.subscribe(data => {
      //console.log(data);
      this.totalRows = data.totalElements;
      this.pageSize = data.size
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });

    this.encuestaService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.encuestaService.listarTodosPaginado(0, this.pageSize).subscribe(data => {
      console.log('listarTodosPaginado data: ', data);
      this.totalRows = JSON.parse(JSON.stringify(data)).totalElements;
      this.pageSize = JSON.parse(JSON.stringify(data)).size
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(data)).content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });

  }


  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(id: number) {
    
    this.encuestaService.eliminar(id).subscribe(() => {

      this.encuestaService.listarTodosPaginado(0, this.pageSize).subscribe(data => {
        console.log('eliminar listarTodosPaginado data: ', data);
        this.totalRows = JSON.parse(JSON.stringify(data)).totalElements;
        this.pageSize = JSON.parse(JSON.stringify(data)).size
        this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(data)).content);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
        this.paginator.firstPage()
        this.encuestaService.mensajeCambio.next('SE ELIMINO');
      });
    });

  }

  mostrarMas(e: any){
    this.encuestaService.listarTodosPaginado(e.pageIndex, e.pageSize).subscribe(data => {
      console.log('mostrarMas listarTodosPaginado data: ', data);
      this.totalRows = JSON.parse(JSON.stringify(data)).totalElements;
      this.pageSize = JSON.parse(JSON.stringify(data)).size
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(data)).content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });
  }
  

}
