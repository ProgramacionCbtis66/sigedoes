import { Component, OnInit } from '@angular/core';
import { PdfCreateService } from 'src/app/service/pdf-create.service';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  constructor(private pdf: PdfCreateService) { }

  ngOnInit(): void {
  }

  generarPdf(){
    const PDF = this.pdf.Pdf();
    console.log(PDF);
  }

  /*createPDF(){
 
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo lol',
        }
      ]
    }
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }*/
}