import React from 'react';
import ToolCard from './ToolCard';
import { Tool } from '../../services/types';

interface ToolListProps {
  tools: Tool[];
  onToolClick: (toolId: string) => void;
}

const ToolList: React.FC<ToolListProps> = ({ tools, onToolClick }) => {
  // If there are no tools at all, show empty state
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or browse different categories.</p>
      </div>
    );
  }

  // Sort tools by descending averageRating
  const sortedTools = [...tools].sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div>
      {/* Display all tools passed in, ordered by averageRating */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedTools.map(tool => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => onToolClick(tool.id)}
          />
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {sortedTools.length} {sortedTools.length === 1 ? 'tool' : 'tools'}
      </div>
    </div>
  );
};

export default ToolList;
