// angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// 3rd-party library imports
import { UUID } from 'angular2-uuid';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// custom services
import { UserService } from '../../../services/users/user.service';
import { GuidValidatorService } from '../../../services/guid-validator/guid-validator.service';

// custom models
import { UserAccount } from '../../../models/users/user-account';
import { Mandator } from '../../../models/mandators/mandator';

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
  private currentUid: string;
  private userAccount: UserAccount;
  private mandators: Mandator[];
  private assignedMandator: Mandator;
  private viewHasChanges: boolean;
  private saveChangesModalRef: NgbModalRef;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private saveChangesModal: NgbModal,
              private guidValidatorService: GuidValidatorService) { }

  // loads the data of the selected user creates a new user if it's an empty guid
  private loadUserAccountData() {    
    this.currentUid = this.route.snapshot.params['uid'];
    // let isValidGuid = this.guidValidatorService.isGuidParamValid(this.uid);
    // console.log(isValidGuid);

    // if(isValidGuid) {
      if(this.currentUid !== this.emptyGuid) {
        this.userService.getUserAccount(this.currentUid)
          .subscribe(data => {
            console.log(data);
            this.userAccount = data['User'];
            this.assignedMandator = data['Mandator'];
            this.assignedMandator.IsAssigned = true;
            
            if(this.assignedMandator) {
              this.setAssignedMandator(this.assignedMandator);
            }
          }, (error: any) => {
            console.log(error);
          });
      } else {
        this.isNewAccount = true;
        this.createNewUserAccount();
      }
    // } else {
    //   console.log("invalid guid: " + this.uid);
    //   this.router.navigate(['/notfound']);
    // }
  }

  // creates a new user account
  private createNewUserAccount() {
    console.log('Creating new UserAccount');
    this.currentUid = UUID.UUID();
    this.userAccount = new UserAccount(this.currentUid, '', '', '', '', '', new Date(Date.now()), null);
  }

  // loads all mandators
  private loadMandators() {
    this.userService.getMandators()
      .subscribe(data => {
        this.mandators = data;
        console.log(this.mandators)
      }, (error: any) => {
        console.log(error);
      });
  }

  // sets the assigned mandator
  private setAssignedMandator(mand: Mandator) {
    this.mandators.find(m => m.UID === mand.UID).IsAssigned = mand.IsAssigned;
    if(mand.IsAssigned) {
      this.assignedMandator = mand;
    } else {
      this.assignedMandator = null;
    }

    console.log(this.mandators);
  }

  // toggles the value from the currently assigned mandator and the mandator that should be newly assigned
  private toggleAssignedMandator(mandator: Mandator) {
    mandator.IsAssigned = !mandator.IsAssigned;
    this.setAssignedMandator(mandator)
    this.mandators.filter(m => m.UID != mandator.UID).forEach(m => m.IsAssigned = false);
  }

  // saves the changed user account data via UserService's addOrUpdateUser-method 
  private save() {
    console.log('save user account');
    this.userService.addOrUpdateUser(this.assignedMandator.UID, this.userAccount)
      .subscribe(data => {
        console.log(data);

        // checks if http-get service state is ok
        if(data['ok']) {
          this.goBack();
        }
        else {
          // open warning modal and stay on detail
          console.log('error on: ' + data['_body'])
        }
      }, error => {
        console.log(error);
      });
  }

  // cancles the current changes and goes back to the users overview
  private cancle(content) {
    if(this.viewHasChanges && !this.isNewAccount) {
      this.openSaveChangesModal(content);
    } else {
      this.goBack();
    }
  }

  // notifies over data changes from user interactions on the view
  private viewChanged() {
    this.viewHasChanges = true;
  }

  // notifies about changes from the datepicker of the ValidFrom property
  private validFromChanged(date) {
    console.log(date);
    this.userAccount.ValidFrom = new Date(date.year, date.month, date.day);
    this.viewChanged();
  }
  
  // opens a modal and asks if the changes should be saved if the user wants to cancle the editing process
  private openSaveChangesModal(content) {
    this.saveChangesModalRef = this.saveChangesModal.open(content);
  }

  // saves the changes, closes the opened modal and navigates back to the users overview
  private saveChanges() {
    this.save();
    this.saveChangesModalRef.close();
    this.goBack();
  }

  // discards the changes, closes the opened modal and navigates back to the users overview
  private discardChanges() {
    this.saveChangesModalRef.close();
    this.goBack();
  }

  // navigates back to the users overview
  private goBack() {
    this.router.navigate(['/users']);
  }

  ngOnInit() {
    this.loadMandators();
    this.loadUserAccountData();
  }
}
