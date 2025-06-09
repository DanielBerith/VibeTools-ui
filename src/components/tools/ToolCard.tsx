import React from 'react';
import StarRating from '../common/StarRating';
import { Tool } from '../../services/types';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 lg:p-6 cursor-pointer border border-gray-100 hover:border-gray-200 relative overflow-hidden sm:hover:-translate-y-0.5 ${
        tool.isHidden ? 'opacity-60' : ''
      }`}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300 pointer-events-none" />
      
      <div className="relative">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 truncate group-hover:text-blue-600 transition-colors duration-200">
              {tool.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {tool.category}
              </span>
            </div>
          </div>
          
          {/* Badges section */}
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 sm:gap-2">
            {tool.isCommunityFavorite && (
              <span className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg shadow-yellow-500/25 animate-pulse">
                <svg className="w-4 h-4 mr-1.5 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="hidden sm:inline">Community</span> Favorite
              </span>
            )}
            {tool.isHidden && (
              <span className="inline-flex items-center bg-red-500/20 text-red-400 text-xs px-2.5 py-1 rounded-full font-medium border border-red-500/40 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                Hidden
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {tool.description}
        </p>
        
        {/* Footer section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <StarRating rating={tool.averageRating} readonly size="sm" />
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {tool.averageRating > 0 ? (
                <>
                  <span className="text-gray-700 font-semibold">{tool.averageRating.toFixed(1)}</span>
                  <span className="hidden sm:inline"> rating</span>
                </>
              ) : (
                'No ratings yet'
              )}
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold group/btn transition-all duration-200"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;