// angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// 3rd-party library imports
import { UUID } from 'angular2-uuid';
import { NgbModal, NgbModalRef, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  private errorModalRef: NgbModalRef;
  public dt: NgbDateStruct;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private saveChangesModal: NgbModal,
              private errorModal: NgbModal,
              private guidValidatorService: GuidValidatorService) { }

  // loads the data of the selected user creates a new user if it's an empty guid
  private loadUserAccountData() {    
    this.currentUid = this.route.snapshot.params['uid'];

    // validator checks if the uid in the url is valid
    let isValidGuid = this.guidValidatorService.isGuidParamValid(this.currentUid);

    if(isValidGuid) {
      if(this.currentUid !== this.emptyGuid) {
        this.userService.getUserAccount(this.currentUid)
          .subscribe(data => {
            console.log(data);
            this.userAccount = data['User'];
            this.assignedMandator = data['Mandator'];
            this.assignedMandator.IsAssigned = true;
            
            // this.convertLoadedDates();

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
    } else {
      console.log("invalid guid: " + this.currentUid);
      this.router.navigate(['/notfound']);
    }
  }

  // creates a new user account
  private createNewUserAccount() {
    console.log('Creating new UserAccount');
    this.currentUid = UUID.UUID();
    // let currentDate = validFrom['year'] + '-' + validFrom['month'] + '-' + validFrom['day'] + 'T00:00:00';
    // this.userAccount = new UserAccount(this.currentUid, '', '', '', '', '', new Date(Date.now()), null);
    this.userAccount = new UserAccount(this.currentUid, '', '', '', '', '','', null);
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
    // this.convertDates();
    this.userService.addOrUpdateUser(this.assignedMandator.UID, this.userAccount)
      .subscribe(data => {
        console.log(data);

        // checks if http-get service state is ok
        if(data['ok']) {
          this.viewHasChanges = false;
          this.goBack();
        }
      }, error => {
        // this.openErrorModal(errorContent);
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
  
  private validFromChanged(date) {
    let dateString = date['year'] + '-' + date['month'] + '-' + date['day'];
    console.log('dateString')
    console.log(dateString)

    this.userAccount.ValidFrom = dateString;
    this.viewChanged();
  }

  private validToChanged(date) {
    let dateString = date['year'] + '-' + date['month'] + '-' + date['day'];
    console.log('dateString')
    console.log(dateString)

    this.userAccount.ValidTo = dateString;
    this.viewChanged();
  }

  // opens a modal if an error occurres while trying to save or upate the user account
  private openErrorModal(content) {
    this.errorModalRef = this.errorModal.open(content);
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

  private convertDates() {
    let validFrom = this.userAccount.ValidFrom;
    let validTo = this.userAccount.ValidTo;
    let validFromString: string;
    let validToString: string;


    if(validFrom !== undefined && validFrom !== null) {
      validFromString = validFrom['year'] + '-' + validFrom['month'] + '-' + validFrom['day'];
    }
    
    if(validTo !== undefined && validTo !== null) {
      validToString = validTo['year'] + '-' + validTo['month'] + '-' + validTo['day'];
    }
    
    if(validFromString !== undefined){
      this.userAccount.ValidFrom = validFromString;
    } 
    
    if(validToString !== undefined){
      this.userAccount.ValidTo = validToString;
    } 
  }

  private convertLoadedDates() {
    let validFrom = this.userAccount.ValidFrom;
    let validTo = this.userAccount.ValidTo;
    let validFromString: any;
    let validToString: any;

    if(validFrom !== null) {
      let dateArray = validFrom.split('-', 3);
      validFromString = {
        "day": dateArray[2].replace('T00:00:00', ''),
        "month": dateArray[1],
        "year": dateArray[0]
      }

      this.userAccount.ValidFrom = validFrom;
    }
      console.log('validFromString')
      console.log(validFromString)

    if(validTo !== null) {
      let dateArray = validTo.split('-', 3);
      validToString = {
        "day": dateArray[2].replace('T00:00:00', ''),
        "month": dateArray[1],
        "year": dateArray[0]
      }

      this.userAccount.ValidTo = validTo;
    }
    
    // if(validTo !== null) {
    //   validToString = validTo['year'] + '-' + validTo['month'] + '-' + validTo['day'];
    // }
    
    // if(validFromString !== undefined){
    //   this.userAccount.ValidFrom = validFromString;
    // } 
    
    // if(validToString !== undefined){
    //   this.userAccount.ValidTo = validToString;
    // } 
  }

  ngOnInit() {
    this.loadMandators();
    this.loadUserAccountData();
  }
}
