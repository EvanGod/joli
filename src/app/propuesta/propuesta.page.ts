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

    const hoy = new Date();
    const fin = new Date(hoy);
    fin.setFullYear(hoy.getFullYear() + this.anios);

    const formato = (fecha: Date) => {
      return `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`;
    };

    const docDefinition: any = {
      pageSize: 'LETTER',
      pageMargins: [40, 60, 40, 80],
      content: [
        {
          canvas: [
            {
              type: 'path',
              d: 'M0 0 L0 30 L400 30 Q450 30 450 10 L450 0 Z',
              color: '#00C5CD',
            },
          ],
          absolutePosition: { x: 0, y: 0 },
        },
        {
          image: 'logoJoli',
          width: 80,
          alignment: 'right',
          margin: [0, -60, 0, 10],
        },
        {
          text: 'PROPUESTA INVERSIÓN MODALIDAD 40',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text:
            'JOLI FOAN, S.A.P.I. de C.V. es una empresa legalmente constituida bajo la figura de Sociedad Anónima Promotora de Inversión, lo que brinda seguridad jurídica y garantiza que su capital se maneje con transparencia y al amparo de la legislación vigente para este tipo de oportunidades de inversión.\n\n' +
            'La Modalidad 40 (Continuación Voluntaria al Régimen Obligatorio) representa una de las estrategias más sólidas y rentables de nuestra empresa. En este sentido, le proponemos invertir su capital a proyectos enfocados en mejorar el monto de pensión de nuestros clientes.\n' +
            'Esta inversión no solo impulsa un impacto positivo en la vida de las personas, sino que también genera atractivos retornos para los inversionistas.',
          fontSize: 12,
          lineHeight: 1.4,
          alignment: 'justify',
          margin: [0, 0, 0, 25],
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: 'Nombre del inversionista:',
                  bold: true,
                  fillColor: '#00C5CD',
                  color: 'white',
                  fontSize: 11,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
                {
                  text: this.nombre,
                  fillColor: '#FFFFFF',
                  fontSize: 11,
                  bold: true,
                  margin: [5, 4],
                  alignment: 'right',
                  border: [true, true, true, true],
                },
              ],
              [
                {
                  text: 'Capital a invertir:',
                  bold: true,
                  fillColor: '#00C5CD',
                  color: 'white',
                  fontSize: 11,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
                {
                  text: `$${(this.inversionInicial ?? 0).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    }
                  )}`,
                  fillColor: '#FFFFFF',
                  alignment: 'right',
                  fontSize: 11,
                  bold: true,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 14],
        },
        {
          table: {
            widths: ['*', 'auto', '*', 'auto'],
            body: [
              [
                {
                  text: 'Periodo de inversión (años):',
                  bold: true,
                  fillColor: '#00C5CD',
                  color: 'white',
                  fontSize: 11,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
                {
                  text: `${this.anios} año`,
                  fillColor: '#FFFFFF',
                  alignment: 'center',
                  fontSize: 11,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
                {
                  text: 'Tasa de interés (anual)',
                  bold: true,
                  fillColor: '#00C5CD',
                  color: 'white',
                  fontSize: 11,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
                {
                  text: `${this.tasaInteres}%`,
                  fillColor: '#FFFFFF',
                  alignment: 'center',
                  fontSize: 11,
                  margin: [5, 4],
                  border: [true, true, true, true],
                },
              ],
              [
                {
                  text: `del ${formato(hoy)} al ${formato(fin)}`,
                  colSpan: 4,
                  alignment: 'center',
                  fillColor: '#DFF9FA',
                  fontSize: 11,
                  margin: [5, 6],
                  border: [true, true, true, true],
                },
                {},
                {},
                {},
              ],
            ],
          },
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                'Inversión inicial',
                {
                  text: `$${(this.inversionInicial ?? 0).toLocaleString(
                    undefined,
                    { minimumFractionDigits: 2 }
                  )}`,
                  alignment: 'right',
                },
              ],
              [
                'Interés generado',
                {
                  text: `$${this.interesGenerado.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`,
                  alignment: 'right',
                },
              ],
              [
                { text: 'Resultado de tu inversión', bold: true },
                {
                  text: `$${this.valorFuturo.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`,
                  alignment: 'right',
                },
              ],
              [
                { text: 'I.S.R. Retenido por Intereses Generados', bold: true },
                {
                  text: `$${this.isr.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`,
                  alignment: 'right',
                },
              ],
              [
                { text: 'Retribución Real Inversionista', bold: true },
                {
                  text: `$${this.retribucion.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`,
                  fillColor: '#DFF9FA',
                  bold: true,
                  alignment: 'right',
                },
              ],
            ],
          },
          layout: {
            hLineWidth: (i: number) => (i === 0 ? 1 : 0),
            vLineWidth: () => 0,
          },
          margin: [0, 0, 0, 10],
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              table: {
                widths: ['*', 'auto'],
                body: [
                  [
                    { text: `Retorno de Inversión`, bold: true, fontSize: 11 },
                    {
                      text: `${this.retorno.toFixed(2)}%`,
                      alignment: 'center',
                      fillColor: '#DFF9FA',
                      bold: true,
                      fontSize: 11,
                    },
                  ],
                ],
              },
              layout: {
                hLineWidth: () => 0,
                vLineWidth: () => 0,
              },
            },
            { width: '*', text: '' },
          ],
          margin: [0, 10, 0, 30],
        },
        {
          text: 'Estamos a su disposición para resolver cualquier duda y dar seguimiento a esta propuesta en cuanto usted lo considere conveniente.\n\nJOLI FOAN S.A.P.I., DE C.V.',
          fontSize: 10,
          alignment: 'justify',
        },
      ],
      footer: () => ({
        margin: [40, 5, 40, 5],
        stack: [
          {
            columns: [
              {
                text: 'Blvd. Bernardo Quintana Arrioja 14, 2da Secc 76160 Santiago de Querétaro, Qro',
                fontSize: 9,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'comercial@joli.com.mx',
                fontSize: 9,
                alignment: 'center',
                bold: true,
              },
              {
                text: '442 868 8669',
                fontSize: 9,
                alignment: 'right',
                bold: true,
              },
            ],
          },
        ],
      }),
      images: {
        logoJoli: await this.toBase64('assets/joli_logo.jpg'),
      },
    };

    pdfMake.createPdf(docDefinition).getBlob(async (blob: Blob) => {
      const loading = await this.loadingCtrl.create({
        message: 'Enviando propuesta...',
        spinner: 'crescent',
        cssClass: 'custom-loading',
      });
      await loading.present();

      const formData = new FormData();

      formData.append('nombre', this.nombre);
      formData.append('inversionInicial', String(this.inversionInicial));
      formData.append('tasaInteres', String(this.tasaInteres));
      formData.append('anios', String(this.anios));
      formData.append('valorFuturo', String(this.valorFuturo));
      formData.append('interesGenerado', String(this.interesGenerado));
      formData.append('isr', String(this.isr));
      formData.append('retribucion', String(this.retribucion));
      formData.append('retorno', String(this.retorno.toFixed(2)));

      const pdfFile = new File([blob], `Propuesta-${this.nombre}.pdf`, {
        type: 'application/pdf',
      });
      formData.append('pdf', pdfFile);

      this.propuesta.enviarPropuesta(formData).subscribe({
        next: async (res) => {
          await loading.dismiss();
          alert('Propuesta enviada correctamente.');
          this.router.navigate(['/home-admin']);
        },
        error: async (err) => {
          await loading.dismiss();
          console.error('Error al enviar propuesta:', err);
          alert('Hubo un error al enviar la propuesta.');
        },
      });
    });
  }

  async toBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
