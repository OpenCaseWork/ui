import { NgModule } from '@angular/core';
import { MaterialModule,
        MdButtonModule,
        MdSnackBarModule,
        MdMenuModule,
        MdNativeDateModule,
        MdDatepickerModule
         }  from '@angular/material';
// import { MdMenuTrigger } from '@angular/material';

@NgModule({
  imports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    MdSnackBarModule,
    MdNativeDateModule,
    MdDatepickerModule
    //MdInputModule
    // MdMenuTrigger
  ],
  exports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    MdSnackBarModule,
    MdNativeDateModule,
    MdDatepickerModule
   // MdInputModule
    // MdMenuTrigger
  ],
  declarations: [
    // MdMenuTrigger
  ]
})
export class CustomMaterialModule {}
