import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent {
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void { }

    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe({
            next: (result) => {
                console.log(result);
                this.dialogRef.close();
                this.snackBar.open('User registration successful', 'OK', {
                    duration: 2000,
                });
            },
            error: (error) => {
                this.snackBar.open('User registration failed', 'OK', {
                    duration: 2000,
                });
            }
        }
        );
    }
}
