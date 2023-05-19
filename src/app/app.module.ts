import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DetailsComponent } from './details/details.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EditComponent } from './edit/edit.component';

//Basic Routing implemented
const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
    declarations: [
        AppComponent,
        UserRegistrationFormComponent,
        UserLoginFormComponent,
        MovieCardComponent,
        WelcomePageComponent,
        ProfilePageComponent,
        DetailsComponent,
        NavigationComponent,
        EditComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        AppRoutingModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        MatMenuModule,
        RouterModule.forRoot(appRoutes),
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }