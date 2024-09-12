import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    ProgressSpinnerModule,
    ConfirmPopupModule,
    StyleClassModule,
    InputTextModule,
    DropdownModule,
    MessagesModule,
    SkeletonModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    DividerModule,
    CardModule,
    ChipModule,
    DialogModule,
    ToastModule
]
})
export class PrimeNgModule {}