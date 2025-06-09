import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StarRating from '../common/StarRating';
import { CreateReviewRequest } from '../../services/types';

const reviewSchema = yup.object({
  rating: yup.number().min(1, 'Please select a rating').max(5).required('Rating is required'),
  comment: yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must be less than 500 characters')
    .required('Comment is required'),
});

interface ReviewFormProps {
  toolId: string;
  onSubmit: (data: CreateReviewRequest) => void;
  isLoading?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ toolId, onSubmit, isLoading = false }) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
    resolver: yupResolver(reviewSchema),
    mode: 'onChange'
  });

  const commentValue = watch('comment', '');
  const characterCount = commentValue.length;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setValue('rating', newRating, { shouldValidate: true });
  };

  const onFormSubmit = async (data: any) => {
    try {
      await onSubmit({ ...data, toolId });
      setIsSubmitted(true);
      setTimeout(() => {
        reset();
        setRating(0);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getRatingText = (rating: number) => {
    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return texts[rating] || '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden border border-gray-100">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
      
      <div className="relative">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Write a Review</h3>
          <p className="text-gray-600">Share your experience to help others</p>
        </div>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              How would you rate this tool?
            </label>
            <div className="flex items-center gap-4">
              <StarRating
                rating={rating}
                onRatingChange={handleRatingChange}
                size="lg"
              />
              {rating > 0 && (
                <span className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fadeIn">
                  {getRatingText(rating)}
                </span>
              )}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-600 flex items-center gap-1 animate-slideIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">
                Your Review
              </label>
              <span className={`text-sm font-medium transition-colors ${
                characterCount > 450 ? 'text-orange-500' : 
                characterCount > 0 ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {characterCount}/500
              </span>
            </div>
            <div className="relative">
              <textarea
                {...register('comment')}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-none
                  ${errors.comment 
                    ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  } 
                  focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
                placeholder="Share your experience with this tool... What did you like? What could be improved?"
              />
              {/* Character count progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 rounded-b-xl overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    characterCount > 450 ? 'bg-orange-500' : 
                    characterCount > 300 ? 'bg-yellow-500' : 
                    characterCount > 0 ? 'bg-green-500' : ''
                  }`}
                  style={{ width: `${Math.min((characterCount / 500) * 100, 100)}%` }}
                />
              </div>
            </div>
            {errors.comment && (
              <p className="text-sm text-red-600 flex items-center gap-1 animate-slideIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.comment.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className={`relative px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform
                ${isLoading || isSubmitted
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg active:scale-100'
                }
                shadow-md`}
            >
              {isSubmitted ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submitted!
                </span>
              ) : isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Review'
              )}
            </button>

            {(rating > 0 || characterCount > 0) && !isLoading && !isSubmitted && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setRating(0);
                }}
                className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideIn {
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

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReviewForm;