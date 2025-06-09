import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreateToolRequest } from '../../services/types';

// Available categories
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

const toolSchema = yup.object({
  name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Name is required'),
  description: yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Description is required'),
  category: yup.string()
    .oneOf(availableCategories, 'Please select a valid category')
    .required('Category is required'),
});

type ToolFormValues = yup.InferType<typeof toolSchema>;

interface ToolFormProps {
  onSubmit: (data: CreateToolRequest) => void;
  isLoading?: boolean;
  initialData?: Partial<CreateToolRequest>;
}

const ToolForm: React.FC<ToolFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  initialData 
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ToolFormValues>({
    resolver: yupResolver(toolSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
    }
  });

  const descriptionValue = watch('description', '');
  const characterCount = descriptionValue.length;

  const onFormSubmit: SubmitHandler<ToolFormValues> = async (values) => {
    const payload: CreateToolRequest = {
      name: values.name.trim(),
      description: values.description.trim(),
      category: values.category,
    };
    
    try {
      await onSubmit(payload);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        if (!initialData) {
          reset({
            name: '',
            description: '',
            category: '',
          });
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleReset = () => {
    reset({
      name: '',
      description: '',
      category: '',
    });
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              {initialData ? (
                <>
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Tool
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Tool
                </>
              )}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {initialData 
                ? 'Update the tool information below' 
                : 'Share an amazing AI tool with the community'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Tool Name Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('name')}
                  type="text"
                  className={`w-full px-4 py-3 pr-10 border-2 rounded-xl transition-all duration-200
                    ${errors.name 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700'
                    } 
                    focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10
                    text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                  placeholder="Enter tool name (e.g., ChatGPT, Figma, Notion)"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className={`w-5 h-5 ${errors.name ? 'text-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 animate-fadeIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>
            
            {/* Category Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register('category')}
                  className={`w-full px-4 py-3 pr-10 border-2 rounded-xl transition-all duration-200 appearance-none
                    ${errors.category 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700'
                    } 
                    focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10
                    text-gray-900 dark:text-white`}
                >
                  <option value="" className="dark:bg-gray-800">Select a category</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category} className="dark:bg-gray-800">
                      {categoryIcons[category]} {category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 animate-fadeIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.category.message}
                </p>
              )}
            </div>
            
            {/* Description Field */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description <span className="text-red-500">*</span>
                </label>
                <span className={`text-sm font-medium transition-colors ${
                  characterCount > 900 ? 'text-orange-600 dark:text-orange-400' : 
                  characterCount > 0 ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {characterCount}/1000
                </span>
              </div>
              <div className="relative">
                <textarea
                  {...register('description')}
                  rows={5}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-none
                    ${errors.description 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700'
                    } 
                    focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10
                    text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                  placeholder="Describe what this tool does, its key features, and how it helps users..."
                />
                {/* Character count progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-600 rounded-b-xl overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      characterCount > 900 ? 'bg-orange-500' : 
                      characterCount > 600 ? 'bg-yellow-500' : 
                      characterCount > 0 ? 'bg-green-500' : ''
                    }`}
                    style={{ width: `${Math.min((characterCount / 1000) * 100, 100)}%` }}
                  />
                </div>
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 animate-fadeIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.description.message}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Provide a detailed description to help users understand the tool's capabilities
              </p>
            </div>
            
            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className={`flex-1 relative px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform
                  ${isLoading || isSubmitted
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg active:scale-100'
                  }
                  shadow-md`}
              >
                {isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0016 0zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {initialData ? 'Updated!' : 'Added!'}
                  </span>
                ) : isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {initialData ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Update Tool
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Tool
                      </>
                    )}
                  </span>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
          </form>
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
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ToolForm;