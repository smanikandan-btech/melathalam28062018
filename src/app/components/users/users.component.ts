import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if('confirm' == this.activatedRoute.snapshot.routeConfig.path){
      this._confirmEmail();
    }
  }

  _confirmEmail(){
    this.userService.confirmEmail(this.activatedRoute.snapshot.queryParams.id).subscribe((res: any) => {
      if(res.success){
        this.alertService.success(res.text, true);
        this.router.navigate(['/signin']);
      } else {
        this.alertService.error(res.text, true);
        this.router.navigate(['/signin']);
      }
    });
  }
}