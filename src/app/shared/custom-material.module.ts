import { NgModule } from '@angular/core';
import { MaterialModule,
        MdButtonModule,
        MdSnackBarModule,
        MdMenuModule,
        MdNativeDateModule,
        MdDatepickerModule,
        MdPaginatorModule,
        MdSortModule
         }  from '@angular/material';
import { MdTableModule, MdSort } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

@NgModule({
  /*imports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    MdSnackBarModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdTableModule,
    CdkTableModule,
    MdPaginatorModule,
    MdSortModule,
    //MdPaginator
    //MdInputModule
    // MdMenuTrigger
  ],*/
  exports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    MdSnackBarModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdTableModule,
    CdkTableModule,
    MdPaginatorModule,
    MdSortModule
    //MdPaginator
   // MdInputModule
    // MdMenuTrigger
  ],
  declarations: [
    // MdMenuTrigger
    //MdPaginator
  ]
})
export class CustomMaterialModule {}
