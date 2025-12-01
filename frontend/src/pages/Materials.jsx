import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaterials } from '../store/slices/materialsSlice';
import { Download, FileText, Image, File } from 'lucide-react';

const Materials = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { materials, pagination, isLoading } = useSelector((state) => state.materials);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMaterials({ page, college: user?.collegeName }));
  }, [dispatch, page, user?.collegeName]);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-600" />;
      case 'image':
        return <Image className="w-6 h-6 text-blue-600" />;
      default:
        return <File className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Study Materials</h1>
      {user?.collegeName && (
        <p className="text-gray-600 mb-4">
          Materials for: <span className="font-semibold">{user.collegeName}</span>
        </p>
      )}

      {isLoading && materials.length === 0 ? (
        <div className="text-center py-8">Loading materials...</div>
      ) : materials.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No materials available for your college.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material) => (
              <div key={material._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3 mb-3">
                  {getFileIcon(material.fileType)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{material.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {material.description && (
                  <p className="text-gray-700 mb-3">{material.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">{material.fileType}</span>
                  <a
                    href={material.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-sm flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
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
        </>
      )}
    </div>
  );
};

export default Materials;

