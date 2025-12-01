import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/slices/postsSlice';
import { fetchCertifications } from '../store/slices/certificationsSlice';
import PostCard from '../components/PostCard';
import { toggleLike, deletePost } from '../store/slices/postsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const { certifications } = useSelector((state) => state.certifications);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchPosts({ page: 1 }));
      dispatch(fetchCertifications({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  const userPosts = posts.filter(p => {
    const authorId = p.authorId?._id || p.authorId;
    const userId = user?.id || user?._id;
    return authorId && userId && authorId.toString() === userId.toString();
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-3xl">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            {user?.collegeName && (
              <p className="text-gray-500">{user?.collegeName}</p>
            )}
            {user?.bio && (
              <p className="mt-2 text-gray-700">{user?.bio}</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Certifications</h2>
        {certifications.length === 0 ? (
          <p className="text-gray-500">No certifications yet.</p>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert._id} className="border-l-4 border-primary-500 pl-4 py-2">
                <h3 className="font-semibold">{cert.title}</h3>
                <p className="text-gray-600">{cert.organization}</p>
                <p className="text-sm text-gray-500">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                {cert.description && (
                  <p className="mt-2 text-gray-700">{cert.description}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline text-sm"
                  >
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">My Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={() => dispatch(toggleLike(post._id))}
                onDelete={() => dispatch(deletePost(post._id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

