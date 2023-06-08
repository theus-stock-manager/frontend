export interface IFilterProps {
  filterValue: string;
  onFilterAction: (() => Promise<void>) | (() => void);
  onFilterChange: (value: string) => void;
  placeholder?: string;
}
