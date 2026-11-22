import avatar from "../../images/avatar.jpg";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "./components/Popup/components/RemoveCard/RemoveCard";

export default function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  function handleAddCardClick() {
    onOpenPopup({
      title: "Novo local",
      children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
    });
  }

  function handleEditProfileClick() {
    onOpenPopup({
      title: "Editar perfil",
      children: <EditProfile />,
    });
  }

  function handleEditAvatarClick() {
    onOpenPopup({
      title: "Alterar a foto do perfil",
      children: <EditAvatar />,
    });
  }

  function handleImageClick(card) {
    onOpenPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }

  function handleDeleteClick(card) {
    onOpenPopup({
      title: "Tem certeza?",
      children: <RemoveCard onConfirm={() => onCardDelete(card)} />,
    });
  }

  useEffect(() => {
    if (!popup) return;

    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClosePopup();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [popup, onClosePopup]);

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar">
          <img
            className="profile__image"
            src={currentUser?.avatar ?? avatar}
            alt="Avatar"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar foto do perfil"
            onClick={handleEditAvatarClick}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={handleEditProfileClick}
            disabled={!currentUser}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={handleAddCardClick}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onDeleteClick={handleDeleteClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup title={popup.title} onClose={onClosePopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
