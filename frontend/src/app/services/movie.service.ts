import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:5000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMovieById(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${movieId}`);
  }

  addMovie(movieData: any): Observable<any> {
    return this.http.post(this.apiUrl, movieData);
  }

  updateMovie(movieData: any, movie_id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${movie_id}`, movieData);
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${movieId}`);
  }

  searchGenres(genreId: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/genres/${genreId}`);
  }
}
