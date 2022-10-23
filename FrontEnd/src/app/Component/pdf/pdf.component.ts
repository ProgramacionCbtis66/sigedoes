import { Component, OnInit } from '@angular/core';
import { PdfCreateService } from 'src/app/service/pdf-create.service';


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



}
