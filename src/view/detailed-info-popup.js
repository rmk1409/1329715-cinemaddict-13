import dayjs from "dayjs";
import {humanizeFilmDuration} from "../util/view";
import {Smart as SmartView} from "./smart";
import {deepCopyFilm} from "../util/common";

const createGenresTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `);
};

const createCommentsTemplate = (comments) => {
  return comments.map(({emotion, comment, author, date, id}) => `<li class="film-details__comment" data-id="${id}">
                                                                  <span class="film-details__comment-emoji">
                                                                    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
                                                                  </span>
                                                                  <div>
                                                                    <p class="film-details__comment-text">${comment}</p>
                                                                    <p class="film-details__comment-info">
                                                                      <span class="film-details__comment-author">${author}</span>
                                                                      <span class="film-details__comment-day">${dayjs(date).format(`YYYY/MM/DD HH:mm`)}</span>
                                                                      <button class="film-details__comment-delete">Delete</button>
                                                                    </p>
                                                                  </div>
                                                                </li>`).join(``);
};

const createDetailedInfoPopupTemplate = (film) => {
  const {
    comments,
    filmInfo: {
      poster, title, alternativeTitle, rating, director, writers, actors, release: {date, releaseCountry},
      runtime, genre, description, ageRating
    },
    userDetails: {watchlist, alreadyWatched, favorite}
  } = film;
  const commentsQuantity = comments.length;
  const genreQuantity = genre.length;
  const duration = humanizeFilmDuration(runtime);

  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="film-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

                    <p class="film-details__age">${ageRating}+</p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${title}</h3>
                        <p class="film-details__title-original">${alternativeTitle}</p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${rating}</p>
                      </div>
                    </div>

                    <table class="film-details__table">
                      <tbody><tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${director}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${writers.join(`, `)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${actors.join(`, `)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${dayjs(date).format(`D MMMM YYYY`)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${duration}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${releaseCountry}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Genre${genreQuantity > 1 ? `s` : ``}</td>
                        <td class="film-details__cell">
                            ${createGenresTemplate(genre)}
                        </td>
                      </tr>
                      </tbody>
                    </table>

                    <p class="film-details__state-description">
                        ${description}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
                  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : ``}>
                  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                </section>
              </div>

              <div class="film-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

                  <ul class="film-details__comments-list">
                    ${createCommentsTemplate(comments)}
                  </ul>

                  <div class="film-details__new-comment">
                    <div class="film-details__add-emoji-label"></div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </section>`;
};

class DetailedInfoPopup extends SmartView {
  constructor(film, closePopup, handleChangeFilm) {
    super(film);

    this._closePopup = closePopup;
    this._handleChangeFilm = handleChangeFilm;

    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._handleClickWatchlist = this._handleClickWatchlist.bind(this);
    this._handleClickWatched = this._handleClickWatched.bind(this);
    this._handleClickFavorite = this._handleClickFavorite.bind(this);
    this._clickEmojiHandler = this._clickEmojiHandler.bind(this);
    this._clickDeleteButtonHandler = this._clickDeleteButtonHandler.bind(this);
  }

  init() {
    this.setHandlers();
  }

  _clickCloseButtonHandler(evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }

  _setClickCloseButtonHandler(cb) {
    this._callback.clickCloseButton = cb;
    this.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickCloseButtonHandler);
  }

  _handleClickWatchlist() {
    const newFilm = deepCopyFilm(this._state);
    newFilm.userDetails.watchlist = !this._state.userDetails.watchlist;
    this._handleChangeFilm(newFilm, true, false);
  }

  _setClickWatchlistHandler() {
    this.element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._handleClickWatchlist);
  }

  _handleClickWatched() {
    const newFilm = deepCopyFilm(this._state);
    newFilm.userDetails.alreadyWatched = !this._state.userDetails.alreadyWatched;
    this._handleChangeFilm(newFilm, true, false);
  }

  _setClickWatchedHandler() {
    this.element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._handleClickWatched);
  }

  _handleClickFavorite() {
    const newFilm = deepCopyFilm(this._state);
    newFilm.userDetails.favorite = !this._state.userDetails.favorite;
    this._handleChangeFilm(newFilm, true, false);
  }

  _setClickFavoriteHandler() {
    this.element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._handleClickFavorite);
  }

  setHandlers() {
    this._setClickCloseButtonHandler(this._closePopup);
    this._setClickWatchlistHandler();
    this._setClickWatchedHandler();
    this._setClickFavoriteHandler();
    this._setClickEmojiHandler();
    this._setClickDeleteButtonHandler();
  }

  getTemplate() {
    return createDetailedInfoPopupTemplate(this._state);
  }

  restoreHandlers() {
    this.setHandlers();
  }

  _clickEmojiHandler(evt) {
    let type = ``;
    if (evt.target.tagName === `INPUT`) {
      type = evt.target.value;
    }
  }

  _setClickEmojiHandler() {
    this.element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._clickEmojiHandler);
  }

  _clickDeleteButtonHandler(evt) {
    evt.preventDefault();
    if (evt.target.className === `film-details__comment-delete`) {
      const commentId = +evt.target.closest(`li`).dataset.id;
      const newFilm = deepCopyFilm(this._state);
      const indexOfDeletedComment = newFilm.comments.findIndex((comment)=>comment.id === commentId);
      newFilm.comments.splice(indexOfDeletedComment, 1);
      const scrollY = window.scrollY;
      this._handleChangeFilm(newFilm, true, true);
      this.element.scrollTo(0, scrollY);
    }
  }

  _setClickDeleteButtonHandler() {
    this.element.querySelector(`.film-details__comments-list`).addEventListener(`click`, this._clickDeleteButtonHandler);
  }
}

export {DetailedInfoPopup};
