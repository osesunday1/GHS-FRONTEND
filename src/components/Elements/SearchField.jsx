const SearchField = ({ searchInput, setSearchInput, handleSearch }) => {
    return (
      
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // Update the input value
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid lightgray',
          }}
        />
        <button
          onClick={handleSearch} // Trigger search when the button is clicked
          style={{
            marginLeft: '10px',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            backgroundColor: 'var(--blue)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
    );
  };
  
  export default SearchField;