import React from 'react';
import StarRating from '../common/StarRating';
import { Review } from '../../services/types';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-3">
        <StarRating rating={review.rating} readonly size="sm" />
        <span className="text-sm text-gray-500">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;