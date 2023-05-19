import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsComponent } from '../details/details.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  user: any = {};
  movies: any = localStorage.getItem('movies');

  constructor(
    public fetchUser: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movies = JSON.parse(this.movies);
    this.getUser(this.movies);
    this.fetchUser.Refreshrequired.subscribe((response) => {
      this.getUser(this.movies);
    });
  }

  openDetails(movie: {}, details: string): void {
    this.dialog.open(DetailsComponent, {
      data: {
        Movie: movie,
        Detail: details,
      },
      width: '400px',
    });
  }

  openEdit(): void {
    this.dialog.open(EditComponent, {
      width: '400px',
    });
  }

  deleteAccount(): void {
    this.fetchUser.deleteUser().subscribe(
      (result) => {
        this.snackBar.open('User deleted', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  addRemoveFromFavorites(id: string, liked: boolean): void {
    if (liked) {
      this.fetchUser.deleteFavoriteMovie(id).subscribe(
        (result) => {
          this.snackBar.open('Removed movie successfully', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open('Something went wrong', 'OK', {
            duration: 2000,
          });
        }
      );
    } else if (!liked) {
      this.fetchUser.addFavoriteMovie(id).subscribe(
        (result) => {
          this.snackBar.open('Added movie successfully', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open('Something went wrong', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }

  async getUser(movies: any[]): Promise<void> {
    this.fetchUser.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.movies = movies.filter((movie) =>
        this.user.favouriteMovies.includes(movie._id)
      );
      return this.user, this.movies;
    });
  }
}