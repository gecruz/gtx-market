import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() title: string = '';
}
