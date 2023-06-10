export interface IPaginationProps {
  numOfPages: number;
  currentPage: number;
  actionPage:
    | ((page?: number, limit?: number) => Promise<void>)
    | ((page?: number, limit?: number) => void);
}
