import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMaterial, fetchMaterials, deleteMaterial } from '../../store/slices/materialsSlice';
import { Trash2, Upload } from 'lucide-react';

const MaterialUpload = () => {
  const dispatch = useDispatch();
  const { materials, isLoading } = useSelector((state) => state.materials);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    collegeName: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchMaterials({ page: 1 }));
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.collegeName || !formData.file) return;

    setIsSubmitting(true);
    try {
      await dispatch(uploadMaterial(formData));
      setFormData({
        title: '',
        description: '',
        collegeName: '',
        file: null,
      });
      dispatch(fetchMaterials({ page: 1 }));
    } catch (error) {
      console.error('Failed to upload material:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (materialId) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      await dispatch(deleteMaterial(materialId));
      dispatch(fetchMaterials({ page: 1 }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Upload Study Material</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              className="input"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              College Name *
            </label>
            <input
              type="text"
              name="collegeName"
              required
              className="input"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="e.g., Tech University"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="input min-h-[100px] resize-none"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File * (PDF, PPTX, DOCX, Images)
            </label>
            <input
              type="file"
              name="file"
              required
              accept=".pdf,.pptx,.docx,.doc,.jpg,.jpeg,.png,.gif"
              className="input"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>{isSubmitting ? 'Uploading...' : 'Upload Material'}</span>
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Uploaded Materials</h2>
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : materials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No materials uploaded yet.</div>
        ) : (
          <div className="space-y-4">
            {materials.map((material) => (
              <div key={material._id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{material.title}</h3>
                  <p className="text-sm text-gray-600">{material.collegeName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(material.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialUpload;

