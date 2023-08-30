export const Searchbar = ({ getQuery }) => {
  return (
    <header>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          getQuery(evt.target.elements.query.value);
          evt.target.reset()
        }}
      >
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          name="query"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
