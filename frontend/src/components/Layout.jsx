import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { LogOut, Home, User, BookOpen, Settings } from 'lucide-react';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/feed" className="flex items-center px-4 text-xl font-bold text-primary-600">
                EduConnect
              </Link>
              <div className="flex space-x-4 ml-8">
                <Link
                  to="/feed"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Feed
                </Link>
                <Link
                  to="/materials"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Materials
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

