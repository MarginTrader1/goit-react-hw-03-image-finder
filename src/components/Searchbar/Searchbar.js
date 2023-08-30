export const Searchbar = ({ getImages }) => {
  return (
    <header>
      <form>
        <button type="button" onClick={getImages}>
          <span>Search</span>
        </button>

        <input type="text" placeholder="Search images and photos" />
      </form>
    </header>
  );
};
