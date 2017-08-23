import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  msgs: Message[] = [];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    if (this.userService.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    console.log(this.form.value);
    this.userService.loginUser(this.form.value).then(res => {
      if (res.status === 200) {
        this.userService.setSession(res.data);
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
        this.router.navigate(['/dashboard']);
      } else {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
      }
    })
  }

  ngOnInit() {
  }

}
