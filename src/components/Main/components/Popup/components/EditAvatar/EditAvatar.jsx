export default function EditAvatar() {
  return (
    <form className="popup__form" id="avatar-form" noValidate>
      <label className="popup__field">
        <input
          id="avatar-link-input"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Link da imagem"
          required
          type="url"
        />
        <span className="avatar-link-input-error popup__input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
