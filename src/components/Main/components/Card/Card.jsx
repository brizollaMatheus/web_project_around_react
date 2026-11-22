export default function Card(props) {
  const { name, link, isLiked } = props.card;

  const cardLikeButtonClassName = isLiked
    ? "card__like-button card__like-button_is-active"
    : "card__like-button";

  function handleImageClick() {
    props.onImageClick(props.card);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
