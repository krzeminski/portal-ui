import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [CommonModule, HttpClientModule],
})
export class SharedModule {}
