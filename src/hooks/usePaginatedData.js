import { useEffect, useState } from "react";

/**
 * This is a custom hook which will return data, loading, error and more properties which are essential for pagination
 * @param {*} url 
 * @param {*} itemsPerPage 
 * @returns 
 */
const usePaginatedData = (url, itemsPerPage = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${url}?_page=${currentPage}&_limit=${itemsPerPage}`
      );
      const totalItems = 50;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError("Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage
  };
};

export default usePaginatedData;
