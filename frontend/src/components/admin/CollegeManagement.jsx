import { useState, useEffect } from 'react';
import api from '../../store/api/api';
import { Trash2, Plus } from 'lucide-react';

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactEmail: '',
    website: '',
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/colleges');
      setColleges(response.data.colleges);
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/colleges', formData);
      setFormData({ name: '', address: '', contactEmail: '', website: '' });
      setShowForm(false);
      fetchColleges();
    } catch (error) {
      console.error('Failed to create college:', error);
      alert(error.response?.data?.error || 'Failed to create college');
    }
  };

  const handleDelete = async (collegeId) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        await api.delete(`/admin/colleges/${collegeId}`);
        fetchColleges();
      } catch (error) {
        console.error('Failed to delete college:', error);
        alert(error.response?.data?.error || 'Failed to delete college');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Colleges</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add College</span>
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Add New College</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College Name *
              </label>
              <input
                type="text"
                required
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="input"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                className="input"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                className="input"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="btn btn-primary">
                Create College
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No colleges registered yet.</div>
        ) : (
          <div className="space-y-4">
            {colleges.map((college) => (
              <div key={college._id} className="border rounded-lg p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{college.name}</h3>
                  {college.address && <p className="text-gray-600">{college.address}</p>}
                  {college.contactEmail && (
                    <p className="text-sm text-gray-500">Email: {college.contactEmail}</p>
                  )}
                  {college.website && (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {college.website}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(college._id)}
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

export default CollegeManagement;

