import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const cardName = name.trim();

    if (cardName.length < 2) {
      setErrorMessage("Digite um título com pelo menos 2 caracteres.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      await onAddPlaceSubmit({ name: cardName, link: link.trim() });
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível criar o cartão. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="new-card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input"
          name="place-name"
          type="text"
          placeholder="Título"
          aria-label="Título do local"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label className="popup__label">
        <input
          className="popup__input"
          name="link"
          type="url"
          placeholder="Link da imagem"
          aria-label="Link da imagem do local"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          required
        />
      </label>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      <button
        className="button popup__button"
        type="submit"
        disabled={isSaving}
      >
        {isSaving ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}
