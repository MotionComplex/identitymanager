import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/users/user';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    UserService
  ]
})
export class UsersComponent implements OnInit {
  private pageTitle: string = 'Benutzerübersicht';
  private users: User[];
  private filteredUsers: User[];
  private searchString: string;

  constructor(private router: Router, private userService: UserService) { }

  private searchUsers() {
    this.filteredUsers = this.users.filter(u => (u.username !== null && u.username.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                                                (u.lastname !== null && u.lastname.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                                                (u.firstname !== null && u.firstname.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                                                (u.emailAddress !== null && u.emailAddress.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())));
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = new Array<User>();

      data.forEach(u => {
        this.users.push(new User(u['UID'], u['Name'], u['Lastname'], u['Firstname'], u['EmailAddress']));
      })
      console.log('user data:');
      console.log(JSON.stringify(data));
      
      this.filteredUsers = this.users;
    });
  }

  selectUser(user: User) {
    console.log('Opening user');
    this.router.navigate(['/users', user.uid]);
  }

  private createUser() {
    console.log('Creating new user');
    this.router.navigate(['/users', '00000000-0000-0000-0000-000000000000']);
  }

  ngOnInit() {
    this.loadUsers();
  }
}
