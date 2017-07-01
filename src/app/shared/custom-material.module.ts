import { NgModule } from '@angular/core';
import { MaterialModule,
        MdButtonModule,
        MdSnackBarModule,
        MdMenuModule,
         }  from '@angular/material';
// import { MdMenuTrigger } from '@angular/material';

@NgModule({
  imports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    MdSnackBarModule
    //MdInputModule
    // MdMenuTrigger
  ],
  exports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    MdSnackBarModule,
   // MdInputModule
    // MdMenuTrigger
  ],
  declarations: [
    // MdMenuTrigger
  ]
})
export class CustomMaterialModule {}
