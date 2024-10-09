import React from "react";
import usePaginatedData from '../hooks/usePaginatedData';
import { Todo } from "../interface/todo";

const PaginatedComp = () => {
  const url: string = 'https://jsonplaceholder.typicode.com/posts';
  // custom hook which will handle data fetching, error, loading for this component
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
  } = usePaginatedData(url, 10);

  return (
    <div>
      <h1>Paginated Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {data.map((item: Todo) => (
            <li key={item.id}>
              {item.id}. {item.title}
            </li>
          ))}
        </ul>
      )}

      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: "0 2rem" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedComp;
