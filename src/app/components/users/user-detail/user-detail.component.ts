// angular imports
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// 3rd-party imports
import { UUID } from 'angular2-uuid';
// import { NgbModal, NgbModalRef, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Overlay, DialogRef } from 'angular2-modal';
import { Modal, OneButtonPreset } from 'angular2-modal/plugins/bootstrap';

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
  private currentDialog: DialogRef<OneButtonPreset>;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private guidValidatorService: GuidValidatorService,
              private modal: Modal,
              overlay: Overlay, 
              vcRef: ViewContainerRef) {
                overlay.defaultViewContainer = vcRef;
              }

  // loads the data of the selected user creates a new user if it's an empty guid
  private loadUserAccountData() {    
    this.currentUid = this.route.snapshot.params['uid'];

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
    this.userAccount = new UserAccount(this.currentUid, '', '', '', '', '','', null);
  }

  // loads all mandators
  private loadMandators() {
    this.userService.getMandators()
      .subscribe(data => {
        this.mandators = data;
        console.log(this.mandators)
      }, (error: any) => {
        this.openMandatorLoadingErrorModal()
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

        this.viewHasChanges = false;
        this.goBack();
      }, error => {
        this.openSaveErrorModal()
        console.log(error);
      });
  }

  // cancles the current changes and goes back to the users overview
  private cancle(content) {
    if(this.viewHasChanges && !this.isNewAccount) {
      this.openSaveChangesModal();
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

  // opens a modal which tells the user that there are still changes on the view and asks him to save them
  private openSaveChangesModal() {
    this.modal.alert()
      .title('Änderungen speichern')
      .body(`
        <div class="alert alert-warning" role="alert">
          <p>Die geänderten Daten gehen verloren, wenn Sie diese jetzt nicht spcichern!</p>
        </div>
        <div class="alert" role="alert">
          <p>Möchten Sie Ihre Änderungen speichern?</p>
        </div>
      `)
      .isBlocking(false)
      .addButton('btn btn-primary', 'Ja', () => {
        this.currentDialog.destroy();
        this.save();
      })
      .addButton('btn btn-primary', 'Nein', () => {
        this.currentDialog.destroy();
        this.goBack();
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
