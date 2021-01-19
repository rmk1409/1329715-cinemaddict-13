import {createMenuTemplate} from "./view/menu";
import {createFilmsSection} from "./view/films-section";
import {createFilmsContainer} from "./view/films-container";
import {createFilmCard} from "./view/film-card";
import {createUserInfoTemplate} from "./view/user-info";
import {createSortTemplate} from "./view/sort";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
// import {createDetailedInfoPopupTemplate} from "./view/detailed-info-popup";
import {createFooterStats} from "./view/footer-stats";
import {createTopRatedTemplate} from "./view/top-rated";
import {createMostCommentedTemplate} from "./view/most-commented";
import {generateFilm} from "./mock/film";
import {PlaceType, render} from "./util/view";
import {generateFilters} from "./mock/filter";

const CARD_QUANTITY = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStats = footer.querySelector(`.footer__statistics`);

const filmsMocks = [];
for (let i = 0; i < 25; i++) {
  filmsMocks.push(generateFilm());
}

render(header, createUserInfoTemplate(filmsMocks), PlaceType.BEFORE_END);

render(main, createMenuTemplate(generateFilters(filmsMocks)), PlaceType.AFTER_BEGIN);
render(main, createSortTemplate(), PlaceType.BEFORE_END);

render(main, createFilmsSection(), PlaceType.BEFORE_END);

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
render(filmsList, createFilmsContainer(), PlaceType.AFTER_BEGIN);

const filmsContainer = main.querySelector(`.films-list__container`);
for (let i = 0; i < CARD_QUANTITY; i++) {
  render(filmsContainer, createFilmCard(filmsMocks[i]), PlaceType.BEFORE_END);
}
render(filmsContainer, createShowMoreButtonTemplate(), PlaceType.AFTER_END);
render(films, createTopRatedTemplate(filmsMocks), PlaceType.BEFORE_END);
render(films, createMostCommentedTemplate(filmsMocks), PlaceType.BEFORE_END);

// render(footer, createDetailedInfoPopupTemplate(filmsMocks[0]), PlaceType.AFTER_END);
render(footerStats, createFooterStats(filmsMocks), PlaceType.AFTER_BEGIN);
