import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogsService} from './dialogs.service';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        FlexModule,
    ],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }
