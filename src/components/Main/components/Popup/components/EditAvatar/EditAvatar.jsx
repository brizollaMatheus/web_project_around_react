import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    try {
      await handleUpdateAvatar({
        avatar: avatarInputRef.current.value.trim(),
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível salvar a foto. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="avatar-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input"
          id="avatar-link"
          name="avatar"
          type="url"
          placeholder="Link da imagem"
          aria-label="Link da nova foto do perfil"
          ref={avatarInputRef}
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
