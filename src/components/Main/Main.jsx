import avatar from "../../images/avatar.jpg";
import { useState, useEffect } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "./components/Popup/components/RemoveCard/RemoveCard";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

console.log(cards);

export default function Main() {
  const [popup, setPopup] = useState(null);
  function handleAddCardClick() {
    setPopup({
      title: "Novo local",
      children: <NewCard />,
    });
  }

  function handleEditProfileClick() {
    setPopup({
      title: "Editar perfil",
      children: <EditProfile />,
    });
  }

  function handleEditAvatarClick() {
    setPopup({
      title: "Alterar a foto do perfil",
      children: <EditAvatar />,
    });
  }

  function handleImageClick(card) {
    setPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }

  function handleDeleteClick() {
    setPopup({
      title: "Tem certeza?",
      children: <RemoveCard />,
    });
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    if (!popup) return;

    function handleEscClose(event) {
      if (event.key === "Escape") {
        setPopup(null);
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [popup]);

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar">
          <img className="profile__image" src={avatar} alt="Avatar" />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar foto do perfil"
            onClick={handleEditAvatarClick}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={handleEditProfileClick}
          ></button>
          <p className="profile__description">Explorador</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={handleAddCardClick}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup title={popup.title} onClose={handleClosePopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
