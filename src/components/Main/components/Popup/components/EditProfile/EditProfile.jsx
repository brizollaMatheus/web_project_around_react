import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    try {
      await handleUpdateUser({
        name: name.trim(),
        about: description.trim(),
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível salvar o perfil. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          name="userName"
          type="text"
          placeholder="Nome"
          minLength={2}
          maxLength={40}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          name="userDescription"
          type="text"
          placeholder="Sobre mim"
          minLength={2}
          maxLength={200}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </label>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      <button
        className="button popup__button"
        type="submit"
        disabled={isSaving}
      >
        {isSaving ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
