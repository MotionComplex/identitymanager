import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { UserAccount } from '../../../models/users/user-account';
import { Mandator } from '../../../models/mandators/mandator';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [
    UserService
  ]
})
export class UserDetailComponent implements OnInit {
  private pageTitle: string = 'Benutzer Einzelansicht';
  private userAccount: UserAccount;
  private mandators: Mandator[];
  private uid: string;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService) { }

  private getUserAccount() {    
    this.uid = this.route.snapshot.params['uid'];

    if(this.uid !== '00000000-0000-0000-0000-000000000000') {
      this.userService.getUserAccount(this.uid)
        .subscribe(data => {

          this.userAccount = new UserAccount(
            data['User']['UID'],
            data['User']['Name'],
            data['User']['Firstname'],
            data['User']['Lastname'],
            data['User']['EmailAddress'],
            data['User']['Identifier'],
            data['User']['ValidFrom'],
            data['User']['ValidTo']
          ) 
        }, (error: any) => {
          console.log(error);
        })
    } else {
      this.createNewUserAccount();
    }
  }

  private getMandators() {
    this.userService.getMandators()
      .subscribe(data => {
        this.mandators = new Array<Mandator>();
        data.forEach(m => {
          this.mandators.push(
            new Mandator(m['UID'], m['Title'], m['Name'])
          );
        });
        console.log(this.mandators)
      }, (error: any) => {
        console.log(error);
      });
  }

  private createNewUserAccount() {
    console.log('Creating new UserAccount');
    this.userAccount = new UserAccount('','','','','','', Date.now().toString(), '')
  }

  private save() {
    // save changes
  }

  private delete() {
    // save changes
  }

  private cancle() {
    this.router.navigate(['/users']);
  }

  ngOnInit() {
    this.getUserAccount();
    this.getMandators();
  }
}
