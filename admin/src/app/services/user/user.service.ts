import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HttpService} from '../http-service/http-service.service';
import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {API_URL} from '../../constants/constants';

@Injectable()
export class UserService {

  constructor(private http: HttpService, private cookieService: CookieService, private router: Router) {
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private userUrl = API_URL + '/user';

  registerUser(user): Promise<any> {
    return this.http.post(this.userUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  loginUser(user): Promise<any> {
    return this.http.post(this.userUrl + '/auth', JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  userList(data): Promise<any> {
    return this.http.post(this.userUrl + '/list', data, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  deleteUser(user_id): Promise<any> {
    return this.http.delete(this.userUrl + '/' + user_id, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  updateUser(user): Promise<any> {
    return this.http.put(this.userUrl + '/' + user._id, user, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  isAuth() {
    return localStorage.user_login != null;
  }

  setSession(data) {
    localStorage.user_login = JSON.stringify(data);
  }

  readSession() {
    return JSON.parse(localStorage.user_login);
  }

  logout() {
    delete localStorage.user_login;
    this.cookieService.removeAll();
    this.router.navigate(['/login']);

  }

}
