import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private publicmenu:boolean = true;
  private membermenu:boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.loggedIn.subscribe(logged => {
      if(logged){
        this.membermenu = true;
        this.publicmenu = false;
      } else {
        this.membermenu = false;
        this.publicmenu = true;
      }
    })
  }

  logout(){
    console.log('logout successfully.');
    this.userService.logout();
    this.router.navigate(['/signin']);
  }

}
