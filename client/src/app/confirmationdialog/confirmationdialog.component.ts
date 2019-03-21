import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {

  constructor(public dialogRef:MatDialog) { }
  public confirmMsg:string;

  ngOnInit() {
  }

}
