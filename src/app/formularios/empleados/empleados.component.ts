import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './empleados.component.html',
  styles: ``
})
export default class EmpleadosComponent {
  empleados: any[] = [];
  matricula = '';
  nombre = '';
  correo = '';
  edad = 0;
  horasTrabajadas = 0;
  editMode = false;
  empleadoEditIndex: number | null = null;
  mostrarTabla = false; 

  constructor() {
    const storedEmpleados = localStorage.getItem('empleados');
    if (storedEmpleados) {
      this.empleados = JSON.parse(storedEmpleados);
    }
  }

  registrarEmpleado() {
    
    const empleadoExistente = this.empleados.find(emp => emp.matricula === this.matricula);
    
    
    if (!this.editMode && empleadoExistente) {
      alert('La matrícula ya existe.');
      return;
    }

    
    const horasExtras = this.horasTrabajadas > 40 ? this.horasTrabajadas - 40 : 0;
    const horasNormales = Math.min(this.horasTrabajadas, 40);
    const pagoTotal = (horasNormales * 70) + (horasExtras * 140);

    //aqui actualizamos 
    const empleado = {
      matricula: this.matricula,
      nombre: this.nombre,
      correo: this.correo,
      edad: this.edad,
      horasTrabajadas: this.horasTrabajadas,
      horasExtras,
      pagoTotal
    };

    if (this.editMode && this.empleadoEditIndex !== null) {
      
      this.empleados[this.empleadoEditIndex] = empleado;
      this.editMode = false;
      this.empleadoEditIndex = null;
    } else {

      this.empleados.push(empleado);
    }

    // Guardar empleados en localStorage
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = 0;
    this.horasTrabajadas = 0;
    this.editMode = false;
    this.empleadoEditIndex = null;
  }

  modificarEmpleado() {
    const matriculaInput = prompt('Ingresa la matrícula del empleado a modificar:');
    const index = this.empleados.findIndex(emp => emp.matricula === matriculaInput);

    if (index !== -1) {
      const empleado = this.empleados[index];
      this.matricula = empleado.matricula;
      this.nombre = empleado.nombre;
      this.correo = empleado.correo;
      this.edad = empleado.edad;
      this.horasTrabajadas = empleado.horasTrabajadas;
      this.editMode = true;
      this.empleadoEditIndex = index;
    } else {
      alert(`Empleado con matrícula ${matriculaInput} no encontrado.`);
    }
  }

  eliminarEmpleado() {
    const matriculaInput = prompt('Ingresa la matrícula del empleado a eliminar:');
    const index = this.empleados.findIndex(emp => emp.matricula === matriculaInput);

    if (index !== -1) {
      this.empleados.splice(index, 1);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
    } else {
      alert(`Empleado con matrícula ${matriculaInput} no encontrado.`);
    }
  }

  calcularTotalPagar() {
    return this.empleados.reduce((total, emp) => total + emp.pagoTotal, 0);
  }

  imprimirTabla() {
    this.mostrarTabla = true;
  }
   // este metodo limpia todo la tabla esto es opcional
   eliminarTodo() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los empleados? Esta acción no se puede deshacer.')) {
      this.empleados = []; 
      localStorage.removeItem('empleados'); 
      this.mostrarTabla = false; 
      alert('Todos los empleados han sido eliminados.');
    }
  }
}
