import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PropuestaService } from '../services/propuesta.service';

(pdfMake as any)['vfs'] = (pdfFonts as any).vfs;

@Component({
  selector: 'app-propuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './propuesta.page.html',
  styleUrls: ['./propuesta.page.scss'],
})
export class PropuestaPage {
  nombre = '';
  inversionInicial: number | null = null;
  tasaInteres: number | null = null;
  anios: number | null = null;

  inversionInicialFormateada: string = '';
  tasaInteresFormateada: string = '';

  valorFuturo = 0;
  interesGenerado = 0;
  isr = 0;
  retribucion = 0;
  retorno = 0;

  formularioValido = false;
  calculado = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private propuesta: PropuestaService
  ) {}

  async irHomeConLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Regresando al home...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
      duration: 1000,
    });

    await loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/home-admin']);
    }, 1000);
  }

  validarFormulario() {
    this.inversionInicial = this.obtenerNumero(this.inversionInicialFormateada);
    this.tasaInteres = this.obtenerNumero(this.tasaInteresFormateada);

    const esNombreValido = this.nombre.trim().length > 0;
    const esInversionValida = this.inversionInicial > 0;
    const esAnioValido =
      this.anios !== null && Number.isInteger(this.anios) && this.anios > 0;
    const esTasaValida = this.tasaInteres > 0;

    this.formularioValido =
      esNombreValido && esInversionValida && esAnioValido && esTasaValida;

    if (this.calculado) this.limpiarResultados();
  }

  limpiarResultados() {
    this.valorFuturo = 0;
    this.interesGenerado = 0;
    this.isr = 0;
    this.retribucion = 0;
    this.retorno = 0;
    this.calculado = false;
  }

  calcular() {
    if (
      this.inversionInicial === null ||
      this.anios === null ||
      this.tasaInteres === null
    )
      return;

    const principal = this.inversionInicial;
    const tasa = this.tasaInteres / 100;
    const tiempo = this.anios;

    this.valorFuturo = principal * (1 + tasa * tiempo);
    this.interesGenerado = this.valorFuturo - principal;
    this.isr = this.interesGenerado * 0.00125;
    this.retribucion = this.interesGenerado - this.isr;
    this.retorno = (this.retribucion / principal) * 100;

    this.calculado = true;
  }

  obtenerNumero(valor: string): number {
    const limpio = valor.replace(/[^\d.-]/g, '');
    return parseFloat(limpio) || 0;
  }

  formatearInversion() {
    const numero = this.obtenerNumero(this.inversionInicialFormateada);
    if (!isNaN(numero)) {
      this.inversionInicialFormateada = numero.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.inversionInicial = null;
    this.anios = null;
    this.tasaInteres = null;

    this.inversionInicialFormateada = '';
    this.tasaInteresFormateada = '';

    this.formularioValido = false;
    this.limpiarResultados();
  }

  quitarFormatoInversion() {
    this.inversionInicialFormateada = this.obtenerNumero(
      this.inversionInicialFormateada
    ).toString();
  }

  formatearTasa() {
    const numero = this.obtenerNumero(this.tasaInteresFormateada);
    if (!isNaN(numero)) {
      this.tasaInteresFormateada = `${numero.toFixed(2)}%`;
    }
  }

  quitarFormatoTasa() {
    this.tasaInteresFormateada = this.obtenerNumero(
      this.tasaInteresFormateada
    ).toString();
  }

  async exportarPDF() {
    if (
      this.anios === null ||
      this.inversionInicial === null ||
      this.tasaInteres === null
    )
      return;

    const loading = await this.loadingCtrl.create({
      message: 'Enviando propuesta...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });

    await loading.present();

    const datos = {
  nombre: this.nombre,
  inversionInicial: this.inversionInicial,
  tasaInteres: this.tasaInteres,
  anios: this.anios,
  valorFuturo: this.valorFuturo,
  interesGenerado: this.interesGenerado,
  isr: this.isr,
  retribucion: this.retribucion,
  retorno: parseFloat(this.retorno.toFixed(2)),
};


    this.propuesta.enviarPropuesta(datos).subscribe({
      next: async (res) => {
        await loading.dismiss();
        console.log('✅ Propuesta enviada sin PDF:', res);
        this.router.navigate(['/home-admin']);
      },
      error: async (err) => {
        await loading.dismiss();
        console.error('❌ Error al enviar propuesta sin PDF:', err);
        alert('Hubo un error al enviar la propuesta.');
      },
    });
  }
}
