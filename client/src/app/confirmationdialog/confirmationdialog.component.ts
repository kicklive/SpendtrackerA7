import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";


@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {
  public confirmMsg:string;
  constructor(public dialogRef:MatDialog,
    private mdRef: MatDialogRef<ConfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
    ) { debugger;
      this.confirmMsg = this.data ? this.data.msg : "";}
 

  ngOnInit() {
  }

  confirmAction(){
    this.mdRef.close(`${1}`);
  }
  cancelAction(){
    this.mdRef.close(`${0}`);
  }

}
