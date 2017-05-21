import { NgModule } from '@angular/core';
import { MaterialModule,
        MdButtonModule,
        MdMenuModule,
         }  from '@angular/material';
// import { MdMenuTrigger } from '@angular/material';

@NgModule({
  imports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
    //MdInputModule
    // MdMenuTrigger
  ],
  exports: [
    MaterialModule,
    MdButtonModule,
    MdMenuModule,
   // MdInputModule
    // MdMenuTrigger
  ],
  declarations: [
    // MdMenuTrigger
  ]
})
export class CustomMaterialModule {}
