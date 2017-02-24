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
    this.filteredUsers = this.users.filter(u => (u.Name !== null && u.Name.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                                                (u.Lastname !== null && u.Lastname.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                                                (u.Firstname !== null && u.Firstname.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())) ||
                                                (u.EmailAddress !== null && u.EmailAddress.toLocaleLowerCase().includes(this.searchString.toLocaleLowerCase())));
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
    });
  }

  private selectUser(user: User) {
    console.log('Opening user');
    this.router.navigate(['/users', user.UID]);
  }

  private createUser() {
    console.log('Creating new user');
    this.router.navigate(['/users', '00000000-0000-0000-0000-000000000000']);
  }

  ngOnInit() {
    this.loadUsers();
  }
}
