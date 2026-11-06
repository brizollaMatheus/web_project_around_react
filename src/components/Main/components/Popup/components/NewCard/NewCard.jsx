export default function NewCard() {
  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-title-input"
          maxLength="30"
          minLength="2"
          name="place-name"
          placeholder="Título"
          required
          type="text"
        />
        <span className="card-title-input-error popup__input-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link-input"
          name="link"
          placeholder="Link de Imagem"
          required
          type="url"
        />
        <span className="card-link-input-error popup__input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Criar
      </button>
    </form>
  );
}
