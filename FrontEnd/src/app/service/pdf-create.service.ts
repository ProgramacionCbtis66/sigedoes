import { Injectable } from '@angular/core';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";


PdfMakeWrapper.setFonts(pdfFonts);

@Injectable({
  providedIn: 'root'
})
export class PdfCreateService {

  constructor() { }

  Pdf(){
    const pdf = new PdfMakeWrapper();
    pdf.add('Hello world!');
    pdf.create().download('ejemplo');
    
  }


}
