import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ToolForm from '../components/tools/ToolForm';
import { useCreateTool } from '../hooks/useTools';
import { CreateToolRequest } from '../services/types';

const SubmitToolPage: React.FC = () => {
  const navigate = useNavigate();
  const createToolMutation = useCreateTool();

  const handleSubmit = async (toolData: CreateToolRequest) => {
    createToolMutation.mutate(toolData, {
      onSuccess: () => {
        toast.success(`Tool "${toolData.name}" added successfully!`);
        navigate('/');
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.error ||
          'Something went wrong. Please try again.';
        toast.error(msg);
      }
    });
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Submit a New AI Tool
        </h1>
        <p className="text-gray-600">
          Help the community discover amazing AI tools by sharing your favorites
        </p>
      </div>
      
      <ToolForm 
        onSubmit={handleSubmit}
        isLoading={createToolMutation.isPending}
      />
    </div>
  );
};

export default SubmitToolPage;