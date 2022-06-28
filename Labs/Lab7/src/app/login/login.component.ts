import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;

  constructor(private router: Router, private genericService: GenericService) { }

  ngOnInit(): void {
  }

  login(form: NgForm){
    const credentials = {
      'username': form.value.username,
      'password': form.value.password
    }

    this.genericService.login(credentials).subscribe(response => {
      if (response == null){
        alert("Invalid login");
        return;
      }
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(['/home']);
    })
  }

}
