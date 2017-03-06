// angular imports
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// 3rd-party imports
import { Overlay, DialogRef } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

// custom services
import { UserService } from '../../services/users/user.service';

// models
import { User } from '../../models/users/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    UserService
  ]
})
export class UsersComponent implements OnInit {
  private pageTitle = 'Benutzerübersicht';
  private users: User[];
  private filteredUsers: User[];
  private searchString: string;
  private hasConnectionToServer: boolean;
  private orderSymbolClass: string;

  constructor(private router: Router, 
              private userService: UserService,
              public modal: Modal,
              overlay: Overlay, 
              vcRef: ViewContainerRef) {
                overlay.defaultViewContainer = vcRef;
              }

  // searchs users by the searchString
  private searchUsers() {
    this.filteredUsers = this.users
      .filter(u => (u.Name !== null && u.Name.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                   (u.Lastname !== null && u.Lastname.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                   (u.Firstname !== null && u.Firstname.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                   (u.EmailAddress !== null && u.EmailAddress.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())));
  }

  // orders the users by the username
  private orderByName() {
    this.filteredUsers = this.filteredUsers.sort((a, b) => {
      const nameA = a.Name;
      const nameB = b.Name;

      if (nameA < nameB) {
        this.orderSymbolClass = 'glyphicon glyphicon-chevron-down';
        return -1;
      }

      if (nameA > nameB) {
        this.orderSymbolClass = 'glyphicon glyphicon-chevron-up';
        return 1;
      }
      
      return 0;
    });
  }
  
  // orders the users by the firstname
  private orderByFirstname() {
    this.filteredUsers = this.filteredUsers.sort((a, b) => {
      const firstnameA = a.Firstname;
      const firstnameB = b.Firstname;

      if (firstnameA < firstnameB) { 
        return -1;
      }
      
      if (firstnameA > firstnameB) {
        return 1;
      }

      return 0;
    });
  }
  
  // orders the users by their lastname
  private orderByLastname() {
    this.filteredUsers = this.filteredUsers.sort((a, b) => {
      const lastnameA = a.Lastname;
      const lastnameB = b.Lastname;

      if (lastnameA < lastnameB) {
        return -1;
      }

      if (lastnameA > lastnameB) {
        return 1;
      }

      return 0;
    });
  }

  // loads all the users for the user overview via UserService
  private loadUsers() {
    this.hasConnectionToServer = false;
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
      this.hasConnectionToServer = true;
    }, (error: any) => {
      this.openErrorModal();
    });
  }

  // opens the detail view of the selected/clicked user
  private openUser(user: User) {
    console.log('Opening user');
    this.router.navigate(['/users', user.UID]);
  }

  // opens the user detail view with empty data 
  private createUser() {
    console.log('Creating new user');
    this.router.navigate(['/users', '00000000-0000-0000-0000-000000000000']);
  }

  // opens a modal if an error occurres while trying to save or upate the user account
  private openErrorModal() {
    this.modal.alert()
      .title('Fehler beim Abrufen der Benutzer')
      .body(`      
        <div class="alert alert-warning" role="alert">
          <p>Beim Versuch die Benutzer abzurufen, ist ein Fehler aufgetreten.</p>
          <p>Möglicherweise besteht keine Verbindung zum Server.</p>
        </div>     
        <div class="alert" role="alert">
          Bitte versuchen sie es später nochmals!
        </div>
      `)
      .isBlocking(false)
      .open();
  }

  ngOnInit() {
    this.loadUsers();
  }
}
