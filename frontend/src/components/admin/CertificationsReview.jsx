import { useState, useEffect } from 'react';
import api from '../../store/api/api';

const CertificationsReview = () => {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCollege, setFilterCollege] = useState('');

  useEffect(() => {
    fetchCertifications();
  }, [filterCollege]);

  const fetchCertifications = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (filterCollege) params.college = filterCollege;
      const response = await api.get('/certifications/admin/all', { params });
      setCertifications(response.data.certifications);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Student Certifications</h2>
        <input
          type="text"
          placeholder="Filter by college name..."
          className="input max-w-xs"
          value={filterCollege}
          onChange={(e) => setFilterCollege(e.target.value)}
        />
      </div>

      <div className="card">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : certifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No certifications found.</div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert._id} className="border-l-4 border-primary-500 pl-4 py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{cert.title}</h3>
                    <p className="text-gray-600">{cert.organization}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Student: {cert.userId?.name || 'Unknown'} ({cert.userId?.collegeName || 'N/A'})
                    </p>
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
                        className="text-primary-600 hover:underline text-sm mt-2 inline-block"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationsReview;

