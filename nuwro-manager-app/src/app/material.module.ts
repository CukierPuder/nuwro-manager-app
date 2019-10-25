import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatGridListModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class MaterialModule {}
