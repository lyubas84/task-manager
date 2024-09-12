import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
    sidebarVisible = false;
    items: MenuItem[] | undefined;
    ngOnInit() {
        this.items = [
            {
                label: 'User',
                icon: 'pi pi-fw pi-user',
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog'
            }
        ];
    }
}
