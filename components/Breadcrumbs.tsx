import React from 'react';
import { ChevronRightIcon } from './Icons';

interface BreadcrumbItem {
  name: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRightIcon className="w-4 h-4 text-gray-500 mx-2" />}
            {item.onClick ? (
              <button onClick={item.onClick} className="hover:text-orange-400 transition-colors">
                {item.name}
              </button>
            ) : (
              <span className="font-semibold text-white" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
