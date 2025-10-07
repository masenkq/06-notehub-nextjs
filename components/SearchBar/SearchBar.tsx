import css from './SearchBar.module.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
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