export default function RemoveCard({ onConfirm }) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirm();
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <button className="button popup__button" type="submit">
        Sim
      </button>
    </form>
  );
}
