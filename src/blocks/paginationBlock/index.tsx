import * as T from "./types";
import { Pagination } from "react-bootstrap";

export default function PaginationBlock({
  currentPage,
  numOfPages,
  actionPage,
}: T.IPaginationProps) {
  const addCurrentPage = async () => {
    if (currentPage !== numOfPages) {
      actionPage(currentPage + 1);
    }
  };

  const subCurrentPage = async () => {
    if (currentPage > 1) {
      actionPage(currentPage - 1);
    }
  };

  const setItems = () => {
    if (numOfPages <= 5) {
      return Array.from({ length: numOfPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === currentPage}
          onClick={() => actionPage(i + 1)}
          className="pagination-item"
        >
          {i + 1}
        </Pagination.Item>
      ));
    } else if (numOfPages > 5 && currentPage > numOfPages - 2) {
      const arr = [
        numOfPages - 4,
        numOfPages - 3,
        numOfPages - 2,
        numOfPages - 1,
        numOfPages,
      ];

      return Array.from(arr, (e, i) => (
        <Pagination.Item
          key={i + 1}
          active={e === currentPage}
          onClick={() => actionPage(e)}
          className="pagination-item"
        >
          {e}
        </Pagination.Item>
      ));
    } else if (numOfPages > 5 && currentPage >= 3) {
      const arr = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];

      return Array.from(arr, (e, i) => (
        <Pagination.Item
          key={i + 1}
          active={e === currentPage}
          onClick={() => actionPage(e)}
          className="pagination-item"
        >
          {e}
        </Pagination.Item>
      ));
    } else {
      const arr = [1, 2, 3, 4, 5];

      return Array.from(arr, (e, i) => (
        <Pagination.Item
          key={i + 1}
          active={e === currentPage}
          onClick={() => actionPage(e)}
          className="pagination-item"
        >
          {e}
        </Pagination.Item>
      ));
    }
  };

  return (
    <section className="flex items-center justify-center w-full">
      <Pagination className="pagination-container">
        <Pagination.First
          onClick={() => actionPage(1)}
          className="pagination-item"
        />
        <Pagination.Prev onClick={subCurrentPage} className="pagination-item" />
        {setItems()}
        <Pagination.Next onClick={addCurrentPage} className="pagination-item" />
        <Pagination.Last
          onClick={() => actionPage(numOfPages)}
          className="pagination-item"
        />
      </Pagination>
    </section>
  );
}
