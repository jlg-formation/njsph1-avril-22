import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';

@NgModule({
  declarations: [StockComponent, AddComponent],
  imports: [CommonModule, StockRoutingModule, ReactiveFormsModule],
})
export class StockModule {}
