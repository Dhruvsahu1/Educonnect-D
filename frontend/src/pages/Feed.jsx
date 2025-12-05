import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, toggleLike, deletePost } from '../store/slices/postsSlice';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import CertificationForm from '../components/CertificationForm';

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, pagination, isLoading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [showCertForm, setShowCertForm] = useState(false);
  const [page, setPage] = useState(1);

  // --- MODIFICATION STARTS HERE ---
  useEffect(() => {
    // REMOVED: college: user?.collegeName
    // We now just send the page number. The backend will interpret this as "get all posts".
    dispatch(fetchPosts({ page })); 
  }, [dispatch, page]); 
  // --- MODIFICATION ENDS HERE ---

  const handleLike = (postId) => {
    dispatch(toggleLike(postId));
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setShowCertForm(false)}
            className={`btn ${!showCertForm ? 'btn-primary' : 'btn-secondary'}`}
          >
            Create Post
          </button>
          <button
            onClick={() => setShowCertForm(true)}
            className={`btn ${showCertForm ? 'btn-primary' : 'btn-secondary'}`}
          >
            Add Certification
          </button>
        </div>
        {showCertForm ? (
          <CertificationForm onSuccess={() => setShowCertForm(false)} />
        ) : (
          <PostComposer />
        )}
      </div>

      <div className="space-y-4">
        {isLoading && posts.length === 0 ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No posts yet. Be the first to post!</div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={() => handleLike(post._id)}
              onDelete={() => handleDelete(post._id)}
            />
          ))
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <span className="flex items-center px-4">
            Page {page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="btn btn-secondary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;