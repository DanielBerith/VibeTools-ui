import React from 'react';
import ToolCard from './ToolCard';
import { Tool } from '../../services/types';

interface ToolListProps {
  tools: Tool[];
  onToolClick: (toolId: string) => void;
  showHidden?: boolean;
}

const ToolList: React.FC<ToolListProps> = ({ 
  tools, 
  onToolClick, 
  showHidden = false 
}) => {
  // Filter out hidden tools unless explicitly showing them
  const visibleTools = showHidden 
    ? tools 
    : tools.filter(tool => !tool.isHidden);

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

  if (visibleTools.length === 0 && !showHidden) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L4.636 4.636m0 0a9 9 0 1212.728 0M4.636 4.636L9.878 9.878" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">All matching tools are hidden</h3>
        <p className="text-gray-500">The tools that match your criteria are currently hidden from public view.</p>
      </div>
    );
  }

  return (
    <div>
      {!showHidden && tools.length !== visibleTools.length && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>{tools.length - visibleTools.length}</strong> hidden {tools.length - visibleTools.length === 1 ? 'tool' : 'tools'} not shown.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => onToolClick(tool.id)}
          />
        ))}
      </div>
      
      {visibleTools.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {visibleTools.length} of {tools.length} {tools.length === 1 ? 'tool' : 'tools'}
        </div>
      )}
    </div>
  );
};

export default ToolList;