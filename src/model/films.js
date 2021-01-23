import {Observable} from "./observable";

class Films extends Observable {
  get films() {
    return this._films;
  }

  set films(films) {
    this._films = films;
  }

  update(updatedFilm) {
    const index = this._films.findIndex((film) => film.id === updatedFilm.id);
    this._films[index] = updatedFilm;
  }
}

export {Films};
