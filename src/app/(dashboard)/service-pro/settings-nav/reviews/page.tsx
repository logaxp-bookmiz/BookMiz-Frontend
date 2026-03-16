'use client';

import { useState } from 'react';

interface Review {
  id: string;
  service: string;
  rating: number;
  content: string;
  author: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  status: 'pending' | 'published';
}

const ReviewsPage = () => {
  const [reviewsEnabled, setReviewsEnabled] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'pending' | 'published' | 'all'>('pending');

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      service: 'Hair Dressing Service',
      rating: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
      author: {
        name: 'Ujah Emmanuel',
        email: 'ujahemmanuel72@gmail.com',
        avatar: 'UE'
      },
      date: '04 Oct 2024',
      status: 'pending'
    },
    {
      id: '2',
      service: 'Hair Dressing Service',
      rating: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
      author: {
        name: 'Ujah Emmanuel',
        email: 'ujahemmanuel72@gmail.com',
        avatar: 'UE'
      },
      date: '04 Oct 2024',
      status: 'pending'
    },
    {
      id: '3',
      service: 'Hair Dressing Service',
      rating: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
      author: {
        name: 'Ujah Emmanuel',
        email: 'ujahemmanuel72@gmail.com',
        avatar: 'UE'
      },
      date: '04 Oct 2024',
      status: 'pending'
    }
  ]);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const filteredReviews = reviews.filter(review => 
    filterStatus === 'all' ? true : review.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-white p-5 font-sans my-14 flex justify-center">
      <div className="max-w-4xl w-full rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Reviews</h1>
        
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Manage reviews</h2>
          <p className="text-sm text-gray-600 mb-6">
            Automate review requests and showcase 5-star feedback on your Booking Page
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">Enable reviews</h3>
              <p className="text-sm text-gray-600 m-0">
                Customers will receive review requests by email.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">Learn more</a>
              </p>
            </div>
            <div className="ml-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={reviewsEnabled} 
                  onChange={(e) => setReviewsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-medium text-gray-900">Reviews</span>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value as 'pending' | 'published' | 'all')}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="published">Published</option>
              <option value="all">All</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-sm font-medium text-gray-900 block mb-1">
                      {review.service}
                    </span>
                    <div className="text-yellow-400 text-sm">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {review.content}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {review.author.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {review.author.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {review.author.email}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                      title="Like"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                    {review.status === 'pending' && (
                      <button className="bg-gray-900 text-white px-4 py-2 rounded text-xs font-medium hover:bg-gray-700 transition-colors ml-2">
                        Publish review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;