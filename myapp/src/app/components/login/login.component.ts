import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { SecureService } from '../../services/secure.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    standalone: true, 
    imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive]
})
export class LoginComponent implements OnInit {

  entityName:String="user"
  entity:any={}
 
  constructor(private router:Router,
              public secureService: SecureService) { }

  ngOnInit() {
      sessionStorage.setItem('token', '');
      this.secureService.logout();
  }

  login() {
    this.secureService.login(this.entityName,this.entity);
  }

}
