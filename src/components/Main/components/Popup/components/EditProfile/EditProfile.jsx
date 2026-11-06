export default function EditProfile() {
  return (
    <form className="popup__form" id="edit-profile-form" noValidate>
      <label className="popup__field">
        <input
          id="profile-name-input"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nome"
          type="text"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="profile-name-input-error popup__input-error"></span>
      </label>

      <label className="popup__field">
        <input
          id="profile-description-input"
          className="popup__input popup__input_type_description"
          name="description"
          placeholder="Sobre mim"
          type="text"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="profile-description-input-error popup__input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
