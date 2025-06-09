import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTools } from '../hooks/useTools';
import ToolList from '../components/tools/ToolList';
import SearchBar from '../components/tools/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Tool } from '../services/types';

const AllToolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);
  
  // Get ALL tools including hidden ones - use the existing hook
  const { data: tools, isLoading, error, refetch } = useTools(searchQuery, selectedCategories);
  const navigate = useNavigate();

  // Filter tools based on search query, categories, and hidden filter
  const filteredTools = React.useMemo(() => {
    if (!tools) return [];
    
    let filtered = [...tools];
    
    // Apply hidden filter if needed - only show hidden tools when showHiddenOnly is true
    if (showHiddenOnly) {
      filtered = filtered.filter(tool => tool.isHidden === true);
    }
    // If showHiddenOnly is false, show ALL tools (both hidden and visible)
    // Don't filter anything out when showing "All Tools"
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(tool => 
        selectedCategories.includes(tool.category)
      );
    }
    
    return filtered;
  }, [tools, searchQuery, selectedCategories, showHiddenOnly]);

  // Count hidden and visible tools
  const hiddenCount = tools?.filter(tool => tool.isHidden)?.length || 0;
  const visibleCount = tools?.filter(tool => !tool.isHidden)?.length || 0;

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setShowHiddenOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || showHiddenOnly;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">All Tools Directory</h1>
          <p className="text-lg text-gray-300 mb-6">
            Browse all tools in our database, including hidden ones
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{tools?.length || 0}</span>
              <span className="ml-2 text-gray-300">Total Tools</span>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-green-400">{visibleCount}</span>
              <span className="ml-2 text-gray-300">Visible</span>
            </div>
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-red-400">{hiddenCount}</span>
              <span className="ml-2 text-gray-300">Hidden</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchBar 
            onSearch={setSearchQuery} 
            onCategoryFilter={setSelectedCategories} 
          />
        </div>

        {/* Additional Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHiddenOnly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !showHiddenOnly 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => setShowHiddenOnly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                showHiddenOnly 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Hidden Only ({hiddenCount})
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedCategories.map(category => (
                  <span 
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                  >
                    {category}
                  </span>
                ))}
                {showHiddenOnly && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-600">
                    Hidden Tools Only
                  </span>
                )}
              </div>
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message="Failed to load tools. Please try again." />
          </div>
        )}

        {/* Tools List */}
        {!isLoading && !error && filteredTools.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {showHiddenOnly ? 'Hidden Tools' : 'All Tools'} ({filteredTools.length})
              </h2>
            </div>
            
            <ToolList 
              tools={filteredTools} 
              onToolClick={handleToolClick} 
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {hasActiveFilters
                ? "No tools match your search criteria."
                : "No tools available."}
            </p>
            
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllToolsPage;