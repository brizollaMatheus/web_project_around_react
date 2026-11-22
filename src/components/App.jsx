import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let isActive = true;

    api
      .getCardList()
      .then((initialCards) => {
        if (isActive) {
          setCards(initialCards);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isActive = false;
    };
  }, []);

  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleUpdateUser(data) {
    const updatedUser = await api.setUserInfo(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  }

  async function handleUpdateAvatar(data) {
    const updatedUser = await api.setUserAvatar(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  }

  async function handleCardLike(card) {
    try {
      const updatedCard = await api.changeLikeCardStatus(
        card._id,
        !card.isLiked,
      );

      setCards((previousCards) =>
        previousCards.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((previousCards) =>
        previousCards.filter((currentCard) => currentCard._id !== card._id),
      );
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(data) {
    const newCard = await api.addCard(data);

    setCards((previousCards) => [newCard, ...previousCards]);
    handleClosePopup();
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
