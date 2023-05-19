import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  movie: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Movie: {};
      Detail: string;
    }
  ) {
    this.movie = data.Movie;
  }

  ngOnInit(): void {}
}
