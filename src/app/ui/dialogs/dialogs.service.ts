import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
