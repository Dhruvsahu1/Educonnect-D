import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MaterialUpload from '../components/admin/MaterialUpload';
import CollegeManagement from '../components/admin/CollegeManagement';
import CertificationsReview from '../components/admin/CertificationsReview';

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.split('/admin/')[1] || 'materials'
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <Link
            to="/admin/materials"
            onClick={() => setActiveTab('materials')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'materials'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upload Materials
          </Link>
          <Link
            to="/admin/colleges"
            onClick={() => setActiveTab('colleges')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'colleges'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Colleges
          </Link>
          <Link
            to="/admin/certifications"
            onClick={() => setActiveTab('certifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'certifications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Review Certifications
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="materials" element={<MaterialUpload />} />
        <Route path="colleges" element={<CollegeManagement />} />
        <Route path="certifications" element={<CertificationsReview />} />
        <Route index element={<MaterialUpload />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;

