import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { UserAccount } from '../../../models/users/user-account';
import { Mandator } from '../../../models/mandators/mandator';
import { UUID } from 'angular2-uuid';
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
  private emptyGuid: string = '00000000-0000-0000-0000-000000000000';
  private isNewAccount: boolean;
  private viewHasChanges: boolean;
  private userAccount: UserAccount;
  private assignedMandator: Mandator;
  private mandators: Mandator[];
  private uid: string;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService) { }

  private getUserAccount() {    
    this.uid = this.route.snapshot.params['uid'];

    if(this.uid !== this.emptyGuid) {
      this.userService.getUserAccount(this.uid)
        .subscribe(data => {
          console.log(data)          
          this.userAccount = data['User'];
          this.assignedMandator = data['Mandator'];
          this.assignedMandator.IsAssigned = true;
          
          if(this.assignedMandator) {
            // var mand = this.mandators.find(m => m.UID === this.assignedMandator.UID);
            this.setAssignedMandator(this.assignedMandator);
          }
        }, (error: any) => {
          console.log(error);
        });
    } else {
      this.isNewAccount = true;
      this.createNewUserAccount();
    }
  }

  private createNewUserAccount() {
    console.log('Creating new UserAccount');
    this.uid = UUID.UUID();
    this.userAccount = new UserAccount(this.uid, '', '', '', '', '', new Date(Date.now()), null);
  }

  private getMandators() {
    this.userService.getMandators()
      .subscribe(data => {
        this.mandators = data;
        console.log(this.mandators)
      }, (error: any) => {
        console.log(error);
      });
  }

  // sets the value of the IsAssigned property on the mandator
  private setAssignedMandator(mand: Mandator) {
    this.mandators.find(m => m.UID === mand.UID).IsAssigned = mand.IsAssigned;
    if(mand.IsAssigned){
      this.assignedMandator = mand;
    } else {
      this.assignedMandator = null;
    }

    console.log(this.mandators);
  }

  // toggles the value from the currently assigned mandator and the mandator that should be assigned
  private toggleAssignedMandator(mandator: Mandator) {
    mandator.IsAssigned = !mandator.IsAssigned;
    this.setAssignedMandator(mandator)
    this.mandators.filter(m => m.UID != mandator.UID).forEach(m => m.IsAssigned = false);
  }

  private save() {
    console.log('save user account');
    this.userService.addOrUpdateUser(this.assignedMandator.UID, this.userAccount)
      .subscribe(data => {
        console.log(data);
        if(data['ok']) {
          this.router.navigate(['/users']);
        }
        else {
          // open warning modal and stay on detail
          console.log('error on: ' + data['_body'])
        }
      }, error => {
        console.log(error);
      });
  }

  private delete() {
    // save changes
  }

  private cancle() {
    this.router.navigate(['/users']);
  }

  private viewChanged() {
    this.viewHasChanges = true;
  }

  private validFromChanged(date) {
    console.log(date);
    this.userAccount.ValidFrom = new Date(date.year, date.month, date.day);
    this.viewChanged();
  }

  ngOnInit() {
    this.getMandators();
    this.getUserAccount();
  }
}
