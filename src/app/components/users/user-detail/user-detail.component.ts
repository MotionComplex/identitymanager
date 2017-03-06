// angular imports
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// 3rd-party imports
import { UUID } from 'angular2-uuid';
import { Overlay, DialogRef } from 'angular2-modal';
import { Modal, OneButtonPreset } from 'angular2-modal/plugins/bootstrap';

// custom services
import { UserService } from '../../../services/users/user.service';

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
  private pageTitle = 'Benutzer Einzelansicht';
  private emptyGuid = '00000000-0000-0000-0000-000000000000';
  private isNewAccount: boolean;
  private currentUid: string;
  private userAccount: UserAccount;
  private mandators: Mandator[];
  private assignedMandator: Mandator;
  private viewHasChanges: boolean;
  private currentDialog: DialogRef<OneButtonPreset>;
  private validFrom: Date = new Date();
  private validTo: Date;
  private validFromObj: Object;
  private validToObj: Object;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private modal: Modal,
              overlay: Overlay, 
              vcRef: ViewContainerRef) {
                overlay.defaultViewContainer = vcRef;
              }

  // loads the data of the selected user creates a new user if it's an empty guid
  private loadUserAccountData() { 
    this.currentUid = this.route.snapshot.params['uid'];

    if (this.currentUid !== this.emptyGuid) {
      this.userService.getUserAccount(this.currentUid)
        .subscribe(data => {
          console.log(data);
          this.userAccount = data['User'];
          this.assignedMandator = data['Mandator'];
          this.assignedMandator.IsAssigned = true;

          this.convertDatesForDatepicker(this.userAccount.ValidFrom, this.userAccount.ValidTo);
          
          if (this.assignedMandator) {
            this.setAssignedMandator(this.assignedMandator);
          }
        }, (error: any) => {
          console.log(error);
          this.router.navigate(['/notfound']);
        });
    } else {
      this.isNewAccount = true;
      this.createNewUserAccount();
    }
  }

  // creates a new user account
  private createNewUserAccount() {
    console.log('Creating new UserAccount');
    this.currentUid = UUID.UUID();
    this.convertDatesForDatepicker(null, null);
    this.userAccount = new UserAccount(this.currentUid, '', '', '', '', '', '', '', '');
  }

  // loads all mandators
  private loadMandators() {
    this.userService.getMandators()
      .subscribe(data => {
        this.mandators = data;
        console.log(this.mandators);
      }, (error: any) => {
        console.log(error);
        this.openMandatorLoadingErrorModal();
      });
  }

  // sets the assigned mandator
  private setAssignedMandator(mand: Mandator) {
    this.mandators.find(m => m.UID === mand.UID).IsAssigned = mand.IsAssigned;
    if (mand.IsAssigned) {
      this.assignedMandator = mand;
    } else {
      this.assignedMandator = null;
    }

    console.log(this.mandators);
  }

  // toggles the value from the currently assigned mandator and the mandator that should be newly assigned
  private toggleAssignedMandator(mandator: Mandator) {
    mandator.IsAssigned = !mandator.IsAssigned;
    this.setAssignedMandator(mandator);
    this.mandators.filter(m => m.UID !== mandator.UID).forEach(m => m.IsAssigned = false);
  }

  // saves the changed user account data via UserService's addOrUpdateUser-method 
  private save() {
    console.log('save user account');
    this.convertDatesForSaving();
    this.userService.addOrUpdateUser(this.assignedMandator.UID, this.userAccount)
      .subscribe(data => {
        console.log(data);

        this.viewHasChanges = false;
        this.goBack();
      }, error => {
        this.openSaveErrorModal();
        console.log(error);
      });
  }

  // converts dates from type Date to type Object for the ngb-datepicker
  private convertDatesForDatepicker(fromDate: string, toDate: string) {
    if (fromDate === null) {
      fromDate = new Date().toDateString();
    }

    this.validFrom = new Date(fromDate);

    // valid from
    const fromYear = this.validFrom.getFullYear();
    const fromMonth = this.validFrom.getMonth() + 1;
    const fromDay = this.validFrom.getDate();
    const from = fromYear + '-' + fromMonth + '-' + fromDay ;
    this.validFromObj = {
      year: fromYear,
      month: fromMonth,
      day: fromDay
    };

    // valid to
    if (toDate !== null && toDate !== undefined) {
      this.validTo = new Date(toDate);
      const toYear = this.validTo.getFullYear();
      const toMonth = this.validTo.getMonth() + 1;
      const toDay = this.validTo.getDate();
      this.validToObj = {
        year: toYear,
        month: toMonth,
        day: toDay
      };
    }
  }

  // converts objects to formats Date and String so date can be saved to server
  private convertDatesForSaving() {
    console.log('convertDatesToString: Converts the dates from validFromObj and validToObj to date and string format');

    // create string for ValidFrom
    const fromYear = this.validFromObj['year'];
    const fromMonth = this.validFromObj['month'];
    const fromDay = this.validFromObj['day'];
    const from = fromYear + '-' + fromMonth + '-' + fromDay ;

    console.log('validToObj');
    console.log(this.validToObj);
    if (this.validToObj !== undefined && this.validToObj !== null) {
      // create string for user account's ValidTo
      const toYear = this.validToObj['year'];
      const toMonth = this.validToObj['month'];
      const toDay = this.validToObj['day'];
      const to = toYear + '-' + toMonth + '-' + toDay ;

      // set user account's datestrings
      this.userAccount.ValidTo = to;
      
      // converts datestrings to Date for the inputs date comparison/validation
      this.validTo = new Date(to);
    }
    // set user account's datestrings
    this.userAccount.ValidFrom = from;

    // converts datestrings to Date for the inputs date comparison/validation
    this.validFrom = new Date(from);
  }

  // cancles the current changes and goes back to the users overview
  private cancle() {
    if (this.viewHasChanges) {
      this.openSaveChangesModal();
    } else {
      this.goBack();
    }
  }

  // notifies over data changes from user interactions on the view
  private viewChanged() {
    this.viewHasChanges = true;
  }
  
  private dateChanged(date) {
    this.convertDatesForSaving();
    this.viewChanged();
  }

  // opens a modal which tells the user that there are still changes on the view and asks him to save them
  private openSaveChangesModal() {
    this.modal.alert()
      .title('Änderungen speichern')
      .body(`
        <div class="alert alert-warning" role="alert">
          <p>Die geänderten Daten gehen verloren, wenn Sie abbrechen!</p>
        </div>
        <div class="alert" role="alert">
          <p>Möchten Sie wirklich abbrechen?</p>
        </div>
      `)
      .isBlocking(false)
      .addButton('btn btn-primary', 'Ja', () => {
        this.currentDialog.destroy();
        this.goBack();
      })
      .addButton('btn btn-primary', 'Nein', () => {
        this.currentDialog.destroy();
      })
      .okBtnClass('hideOkBtn')
      .open()
      .then(dialog => this.currentDialog = dialog);
  }

  // opens a modal if an error occurres while trying to save or upate the user account
  private openSaveErrorModal() {
    this.modal.alert()
      .title('Fehler beim Speichern')
      .body(`      
        <div class="alert alert-warning" role="alert">
          Beim Versuch Ihre Änderungen zu speichern, ist ein Fehler aufgetreten.
          <p>Möglicherweise besteht keine Verbindung zum Server.</p>
        </div>     
        <div class="alert" role="alert">
          Bitte versuchen sie es später nochmals!
        </div>
      `)
      .isBlocking(false)
      .open();
  }

  // opens a modal if an error occurres while trying to save or upate the user account
  private openMandatorLoadingErrorModal() {
    this.modal.alert()
      .title('Fehler beim Abrufen der Mandanten')
      .body(`      
        <div class="alert alert-warning" role="alert">
          Beim Versuch die Mandanten abzurufen ist ein Fehler aufgetreten.
          <p>Möglicherweise besteht keine Verbindung zum Server.</p>
        </div>     
        <div class="alert" role="alert">
          Bitte versuchen sie es später nochmals!
        </div>
      `)
      .isBlocking(false)
      .open();
  }

  // saves the changes, closes the opened modal and navigates back to the users overview
  private saveChanges() {
    this.save();
    this.goBack();
  }

  // discards the changes, closes the opened modal and navigates back to the users overview
  private discardChanges() {
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
