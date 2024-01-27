import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isAddModalVisible = false;
  isUpdateModalVisible = false;
  isDeleteModalVisible = false;
  movies: Movie[] = [];
  movieVariable: any = {};
  movie: any = {};
  movie_id = '';

  constructor(private movieService: MovieService) {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies: any[]) => {
        this.movies = movies;
      },
      (error) => {
        console.error("Ma'lumotlar so'rovida xatolik!!! : ", error);
      }
    );
  }

  openAddModal() {
    this.isAddModalVisible = true;
  }

  openUpdateModal(movieId: string) {
    this.isUpdateModalVisible = true;
    this.getMoviesById(movieId);
    this.movie_id = movieId;
  }

  openDeleteModal(movieId: string) {
    this.isDeleteModalVisible = true;
    this.movie_id = movieId;
  }

  closeModal() {
    this.isAddModalVisible = false;
    this.isUpdateModalVisible = false;
    this.isDeleteModalVisible = false;
  }

  addModal(addForm: NgForm) {
    if (this.isFormValidFunc(addForm)) {
      this.movieService.addMovie(this.movieVariable).subscribe(
        () => {},
        (error) => {
          console.error("Film qo'shish so'rovida xatolik!!! : ", error);
        }
      );
      addForm.reset();
      this.closeModal();
    }
  }

  updateModal(updateForm: NgForm) {
    if (this.movie_id) {
      this.updateFunc(updateForm);
      this.movieService
        .updateMovie(this.movieVariable, this.movie_id)
        .subscribe(
          () => {},
          (error) => {
            console.error("Filmni yangilash so'rovida xatolik!!! : ", error);
          }
        );
      this.closeModal();
    } else {
      console.log('Film yangilanmadi!!!');
    }
  }

  isFormValidFunc(form: NgForm) {
    if (
      form.value['name'] !== '' &&
      form.value['state'] !== '' &&
      form.value['year'] !== '' &&
      form.value['genre'] !== '' &&
      form.value['img_url'] !== '' &&
      form.value['language'] !== '' &&
      form.value['video_url'] !== '' &&
      form.value['duration'] !== ''
    ) {
      this.movieVariable['name'] = form.value['name'];
      this.movieVariable['state'] = form.value['state'];
      this.movieVariable['year'] = form.value['year'];
      this.movieVariable['genre'] = form.value['genre'];
      this.movieVariable['img_url'] = form.value['img_url'];
      this.movieVariable['language'] = form.value['language'];
      this.movieVariable['video_url'] = form.value['video_url'];
      this.movieVariable['duration'] = form.value['duration'];
      return true;
    } else {
      return false;
    }
  }

  updateFunc(form: NgForm) {
    this.movieVariable['name'] = form.value['name'];
    this.movieVariable['state'] = form.value['state'];
    this.movieVariable['year'] = form.value['year'];
    this.movieVariable['genre'] = form.value['genre'];
    this.movieVariable['img_url'] = form.value['img_url'];
    this.movieVariable['language'] = form.value['language'];
    this.movieVariable['video_url'] = form.value['video_url'];
    this.movieVariable['duration'] = form.value['duration'];
  }

  deleteModal() {
    if (this.movie_id) {
      this.deleteMovie(this.movie_id);
      this.closeModal();
    }
  }

  getMoviesById(movie_id: string): void {
    this.movieService.getMovieById(movie_id).subscribe(
      (movie: any) => {
        this.movie = movie;
      },
      (error) => {
        console.error("Film id so'rovida xatolik!!! : ", error);
      }
    );
  }

  deleteMovie(movieId: string): void {
    this.movieService.deleteMovie(movieId).subscribe(
      () => {},
      (error) => {
        console.error("Filmni o'chirish so'rovida xatolik!!! : ", error);
      }
    );
  }

  ngOnInit(): void {}
}
