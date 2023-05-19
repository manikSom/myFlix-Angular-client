import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://mokkamovie.herokuapp.com/';
@Injectable({
    providedIn: 'root',
})
export class FetchApiDataService {
    constructor(private http: HttpClient) { }

    private _refreshrequired = new Subject<void>();

    get Refreshrequired() {
        return this._refreshrequired;
    }

    userRegistration(userDetails: any): Observable<any> {
        return this.http
            .post(apiUrl + 'users', userDetails)
            .pipe(catchError(this.handleError));
    }

    userLogin(userDetails: any): Observable<any> {
        return this.http
            .post(apiUrl + 'login', userDetails)
            .pipe(catchError(this.handleError));
    }

    getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
            .get(apiUrl + 'movies', {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    getMovie(title: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
            .get(apiUrl + 'movie/' + title, {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
            .pipe(tap(() => this.Refreshrequired.next()))
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    getDirector(name: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
            .get(apiUrl + 'director/' + name, {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    getGenre(genre: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
            .get(apiUrl + 'genre/' + genre, {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    getUser(): Observable<any> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return this.http
            .get(apiUrl + 'users/' + user, {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
            .pipe(tap(() => this.Refreshrequired.next()))
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    getFavorites(user: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
            .get(apiUrl + 'users/' + user, {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
            .pipe(
                map(this.extractResponseData),
                map((data) => data.FavoriteMovies),
                catchError(this.handleError)
            );
    }

    addFavoriteMovie(movieId: string): Observable<any> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return this.http
            .put(
                apiUrl + 'users/' + user + '/movies/' + movieId,
                { movieId: movieId },
                {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + token,
                    }),
                }
            )
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    changeUserName(newUserName: string): Observable<any> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return this.http
            .put(
                `${apiUrl}users/username/${user}/${newUserName}`,
                { newName: newUserName },
                {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + token,
                    }),
                }
            )
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    deleteFavoriteMovie(movieId: string): Observable<any> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return this.http
            .delete(apiUrl + 'users/' + user + '/movies/' + movieId, {
                headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    deleteUser(): Observable<any> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return this.http
            .delete(apiUrl + 'users/' + user, {
                headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
            })
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status},` + `Error body is: ${error.error}`
            );
        }
        return throwError(() => 'Something bad happened; please try again later');
    }
}