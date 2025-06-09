import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (categories: string[]) => void;
}

const availableCategories = [
  'Productivity', 
  'Design', 
  'Writing', 
  'Development', 
  'Marketing', 
  'AI/ML', 
  'Automation',
  'Analytics',
  'Communication',
  'Content Creation'
];

const categoryIcons: Record<string, string> = {
  'Productivity': '⚡',
  'Design': '🎨',
  'Writing': '✍️',
  'Development': '💻',
  'Marketing': '📈',
  'AI/ML': '🤖',
  'Automation': '⚙️',
  'Analytics': '📊',
  'Communication': '💬',
  'Content Creation': '🎬'
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onCategoryFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showCategories, setShowCategories] = useState(true);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onCategoryFilter(newCategories);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    onCategoryFilter([]);
    onSearch('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="relative">
        {/* Search Input */}
        <div className="mb-6">
          <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg 
                className={`w-5 h-5 transition-colors duration-300 ${
                  isFocused ? 'text-blue-500' : 'text-gray-400'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search AI tools by name or description..."
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300
                ${isFocused 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-200 hover:border-gray-300'
                } 
                focus:outline-none text-gray-700 placeholder-gray-400`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500 animate-fadeIn">
              Searching for "<span className="font-medium text-gray-700">{searchQuery}</span>"
            </div>
          )}
        </div>
        
        {/* Category Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Filter by category</span>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="text-gray-400 hover:text-gray-600 transition-transform duration-200"
                style={{ transform: showCategories ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedCategories.length > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full animate-fadeIn">
                  {selectedCategories.length} selected
                </span>
              )}
            </div>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear all
              </button>
            )}
          </div>
          
          {showCategories && (
            <div className="flex flex-wrap gap-2 animate-fadeIn">
              {availableCategories.map((category, index) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`group px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105
                      ${isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {categoryIcons[category]}
                      </span>
                      {category}
                      {isSelected && (
                        <svg className="w-4 h-4 animate-fadeIn" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Active Filters Display */}
        {selectedCategories.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 animate-fadeIn">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Active filters:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs font-medium text-blue-700 border border-blue-200"
                    >
                      {categoryIcons[category]} {category}
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="ml-1 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      </div>
    </div>
  );
};

export default SearchBar;