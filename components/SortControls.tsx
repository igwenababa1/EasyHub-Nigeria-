import React from 'react';

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'name-asc';

interface SortControlsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-gray-400">Sort by:</label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-gray-800/50 border border-gray-700 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
      >
        <option value="popularity">Popularity</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
      </select>
    </div>
  );
};