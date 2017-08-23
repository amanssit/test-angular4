import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/primeng'
import {Message, SelectItem} from 'primeng/primeng';
import {UserService} from '../services/user/user.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ConfirmationService]
})
export class UserComponent implements OnInit {
  roles: SelectItem[];
  selectedRole: any;
  users: any[];
  userForm: FormGroup;
  editForm: FormGroup;
  msgs: Message[] = [];
  displayEdit: boolean;
  records: number;

  constructor(private userService: UserService, private confirmationService: ConfirmationService, private fb: FormBuilder) {
    this.roles = [];
    this.roles.push({label: 'Select Role', value: null});
    this.roles.push({label: 'SU', value: 'su'});
    this.roles.push({label: 'Admin', value: 'admin'});
    this.roles.push({label: 'User', value: 'user'});

    this.records = 20;

    this.userForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      role: [null, Validators.required]
    });

    this.editForm = this.fb.group({
      _id: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });

  }

  addUser() {
    this.userService.registerUser(this.userForm.value)
      .then(res => {
        if (res.status === 200) {
          this.loadUserList(0, 5);
          this.userForm.reset();
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
        }
        else {
          this.msgs = [];
          this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
        }
      })
  }

  ngOnInit() {
    this.loadUserList(0, 5);
  }

  loadUserList(offset, rows) {
    let data = {offset: offset, rows: rows}
    this.userService.userList(data).then(res => {
      if (res.status === 200) {
        this.users = res.data;
        this.records = res.count;
      }
      else {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
      }
    })
  }

  paginate(event) {
    var offset = event.first;
    var rows = event.rows;
    this.loadUserList(offset, rows);
  }

  delete(user_id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to DELETE ?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.userService.deleteUser(user_id)
          .then(res => {
            if (res.status === 200) {
              this.loadUserList(0, 5);
              this.msgs = [];
              this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
            }
            else {
              this.msgs = [];
              this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
            }
          })
      },
      reject: () => {
        this.msgs = [{severity: 'error', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });

  }

  edit(user) {
    this.editForm.patchValue(user);
    this.displayEdit = true;
    console.log(user);
  }

  update() {
    var user = this.editForm.value;
    this.userService.updateUser(user)
      .then(res => {
        if (res.status === 200) {
          this.msgs = [];
          this.loadUserList(0, 5);
          this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
          this.displayEdit = false;
        }
        else {
          this.msgs = [];
          this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
        }
      })

  }

}
