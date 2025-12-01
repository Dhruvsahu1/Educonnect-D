import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../store/api/api';

const CommentThread = ({ comments, postId, onUpdate }) => {
  const { user } = useSelector((state) => state.auth);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = async (parentId) => {
    if (!replyContent.trim()) return;

    try {
      await api.post(`/comments/${postId}`, {
        content: replyContent,
        parentCommentId: parentId,
      });
      setReplyContent('');
      setReplyingTo(null);
      onUpdate();
    } catch (error) {
      console.error('Failed to post reply:', error);
    }
  };

  const renderComment = (comment, depth = 0) => {
    return (
      <div key={comment._id} className={`${depth > 0 ? 'ml-8 mt-2' : 'mt-4'}`}>
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm">
            {comment.authorId?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="font-semibold text-sm">{comment.authorId?.name || 'Unknown'}</p>
              <p className="text-gray-800">{comment.content}</p>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <button
                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Reply
              </button>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            {replyingTo === comment._id && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="input flex-1 text-sm"
                />
                <button
                  onClick={() => handleReply(comment._id)}
                  className="btn btn-primary text-sm"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  className="btn btn-secondary text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-2">
                {comment.replies.map((reply) => renderComment(reply, depth + 1))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => renderComment(comment))
      )}
    </div>
  );
};

export default CommentThread;

