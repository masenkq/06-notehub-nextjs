import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBox({ searchTerm, onSearchChange }: SearchBoxProps) {
  return (
    <div className={css.searchContainer}>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={css.searchInput}
      />
    </div>
  );
}