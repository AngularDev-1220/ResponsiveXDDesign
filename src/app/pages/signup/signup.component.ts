import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FbService } from 'src/app/services/fb/fb.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage!: string;
  constructor(public fb: FbService, public router: Router) { }

  ngOnInit(): void {
  }

  signUp(e: any): void {
    this.fb.signup(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}
