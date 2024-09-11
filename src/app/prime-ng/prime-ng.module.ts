import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    SidebarModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    StyleClassModule,
    DividerModule,
    CardModule,
    ChipModule
]
})
export class PrimeNgModule {}