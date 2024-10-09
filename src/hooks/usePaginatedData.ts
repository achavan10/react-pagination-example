import { useEffect, useState } from "react";
import { Todo } from "../interface/todo";

/**
 * This is a custom hook which will return data, loading, error and more properties which are essential for pagination
 * @param {*} url
 * @param {*} itemsPerPage
 * @returns
 */
const usePaginatedData = (url: string, itemsPerPage: number = 10) => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Object | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (currentPage: number) => {
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
    handlePrevPage,
  };
};

export default usePaginatedData;
