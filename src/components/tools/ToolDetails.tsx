import React, { useState } from 'react';
import StarRating from '../common/StarRating';
import ReviewForm from './../reviews/ReviewForm';
import { ToolDetails as ToolDetailsType } from '../../services/types';
import { toolsApi } from '../../services/api';

interface ToolDetailsProps {
  tool: ToolDetailsType;
  isPage?: boolean;
  onReviewAdded?: () => void; // Callback to refresh data after review
}

const ToolDetails: React.FC<ToolDetailsProps> = ({ tool, isPage = false, onReviewAdded }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  
  const reviewCount = tool.reviews?.length || 0;
  const displayedReviews = showAllReviews ? tool.reviews : tool.reviews?.slice(0, 3);

  const handleReviewSubmit = async (reviewData: any) => {
    setIsSubmittingReview(true);
    setReviewError(null);
    
    try {
      await toolsApi.createReview({
        ...reviewData,
        toolId: tool.id
      });
      
      setShowReviewModal(false);
      
      // Call the callback to refresh the tool data
      if (onReviewAdded) {
        onReviewAdded();
      }
      
    } catch (error) {
      setReviewError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };
  
  return (
    <>
      <div className={`bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 ${isPage ? '' : 'p-4 sm:p-6 lg:p-8'} ${isPage ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'}`}>
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl sm:rounded-t-2xl" />
        
        {/* Add padding wrapper if it's a page */}
        <div className={isPage ? 'p-4 sm:p-6 lg:p-8' : ''}>
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6 sm:mb-8">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                {tool.name}
              </h1>
              
              {/* Rating Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={tool.averageRating} readonly />
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    <span className="text-gray-900 font-bold text-lg">{tool.averageRating > 0 ? tool.averageRating.toFixed(1) : '0.0'}</span>
                    <span className="text-gray-500 ml-1">/ 5.0</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {tool.category}
                </span>
                {tool.isHidden && (
                  <span className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Hidden
                  </span>
                )}
              </div>
            </div>
            
            {/* Community Favorite Badge */}
            {tool.isCommunityFavorite && (
              <div className="flex-shrink-0">
                <span className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-4 py-2 rounded-full font-medium shadow-sm animate-pulse">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Community Favorite
                </span>
              </div>
            )}
          </div>
          
          {/* Description Section */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
              {tool.description}
            </p>
          </div>
          
          {/* Reviews Section */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center justify-between">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Reviews ({reviewCount})
              </span>
              {reviewCount > 3 && !showAllReviews && (
                <button
                  onClick={() => setShowAllReviews(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Show all
                </button>
              )}
            </h2>
            
            {reviewCount > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {displayedReviews?.map((review, index) => (
                  <div 
                    key={review.id} 
                    className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.comment.charAt(0).toUpperCase()}
                        </div>
                        <StarRating rating={review.rating} readonly size="md" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed pl-0 sm:pl-13">
                      {review.comment}
                    </p>
                  </div>
                ))}
                
                {reviewCount > 3 && showAllReviews && (
                  <button
                    onClick={() => setShowAllReviews(false)}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2"
                  >
                    Show less
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-500 text-base">No reviews yet</p>
                <p className="text-gray-400 text-sm mt-1">Be the first to share your experience!</p>
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <div className="flex justify-center pt-6 border-t border-gray-200">
            <button 
              onClick={() => setShowReviewModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => setShowReviewModal(false)}>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity animate-fadeIn">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
              className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Write a Review for {tool.name}
                </h3>
                
                {reviewError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {reviewError}
                  </div>
                )}
                
                <ReviewForm
                  toolId={tool.id}
                  onSubmit={handleReviewSubmit}
                  isLoading={isSubmittingReview}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        div[style*="animationDelay"] {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ToolDetails;