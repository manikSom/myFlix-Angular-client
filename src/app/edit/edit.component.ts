import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  @Input() userData = {
    newUserName: '',
  };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changeUserName(): void {
    const { newUserName } = this.userData;
    this.fetchApiData.changeUserName(newUserName).subscribe(
      (result) => {
        this.dialogRef.close();
        this.snackBar.open('Edit successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['welcome']);
        localStorage.removeItem('user');
        localStorage.removeItem('userObject');
        localStorage.removeItem('token');
      },
      (result) => {
        this.snackBar.open('Edit Failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
