import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import CommentThread from './CommentThread';
import api from '../store/api/api';

const PostCard = ({ post, onLike, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(
    post.likes?.some(id => {
      const likeId = typeof id === 'object' ? id._id || id : id;
      const userId = user?.id || user?._id;
      return likeId && userId && likeId.toString() === userId.toString();
    }) || false
  );

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, post._id]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/${post._id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await api.post(`/comments/${post._id}`, { content: newComment });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <div className="card">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
            {post.authorId?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{post.authorId?.name || 'Unknown'}</h3>
              <p className="text-sm text-gray-500">
                {post.authorId?.collegeName || ''} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            {((post.authorId?._id?.toString() === (user?.id || user?._id)?.toString()) || user?.role === 'admin') && (
              <button
                onClick={onDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="mt-2 text-gray-800">{post.content}</p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              className="mt-4 rounded-lg max-w-full h-auto"
            />
          )}
          {post.type === 'certification' && (
            <div className="mt-2 px-3 py-2 bg-primary-50 rounded-lg">
              <span className="text-sm font-medium text-primary-700">Certification</span>
            </div>
          )}
          <div className="mt-4 flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes?.length || 0}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </button>
          </div>
          {showComments && (
            <div className="mt-4 border-t pt-4">
              <CommentThread comments={comments} postId={post._id} onUpdate={fetchComments} />
              <form onSubmit={handleSubmitComment} className="mt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="input flex-1"
                  />
                  <button type="submit" className="btn btn-primary">
                    Post
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

