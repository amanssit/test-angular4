import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/primeng';
import {UserService} from '../../services/user/user.service';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ConfirmationService]
})
export class HeaderComponent implements OnInit {
  name: string;
  msgs: Message[] = [];

  constructor(private userService: UserService, private confirmationService: ConfirmationService) {
    this.name = this.userService.readSession().name;
  }

  ngOnInit() {
  }


  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  onLoggedout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Logout ?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.userService.logout();
      },
      reject: () => {
        this.msgs = [{severity: 'error', summary: 'Rejected', detail: 'You have rejected logout!'}];
      }
    });
  }


}
