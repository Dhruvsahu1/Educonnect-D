import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCertification } from '../store/slices/certificationsSlice';
import { fetchPosts } from '../store/slices/postsSlice';

const CertificationForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    issueDate: '',
    credentialUrl: '',
    description: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.organization || !formData.issueDate) return;

    setIsSubmitting(true);
    try {
      await dispatch(createCertification(formData));
      await dispatch(fetchPosts({ page: 1 }));
      setFormData({
        title: '',
        organization: '',
        issueDate: '',
        credentialUrl: '',
        description: '',
        file: null,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to create certification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certification Title *
        </label>
        <input
          type="text"
          name="title"
          required
          className="input"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., AWS Certified Solutions Architect"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Issuing Organization *
        </label>
        <input
          type="text"
          name="organization"
          required
          className="input"
          value={formData.organization}
          onChange={handleChange}
          placeholder="e.g., Amazon Web Services"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Issue Date *
        </label>
        <input
          type="date"
          name="issueDate"
          required
          className="input"
          value={formData.issueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credential URL
        </label>
        <input
          type="url"
          name="credentialUrl"
          className="input"
          value={formData.credentialUrl}
          onChange={handleChange}
          placeholder="https://..."
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
          placeholder="Describe your certification..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certificate File (optional)
        </label>
        <input
          type="file"
          name="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="input"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onSuccess}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Adding...' : 'Add Certification'}
        </button>
      </div>
    </form>
  );
};

export default CertificationForm;

