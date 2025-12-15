import React, { useState, useEffect } from "react";
import api from "../api/config";
import EditProfile from "../components/EditProfile";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    // Listen for user changes in localStorage
    const handleStorageChange = () => {
      fetchProfile();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Get current user from localStorage to ensure we have the latest user
      const currentUser = localStorage.getItem('user');
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      const userData = JSON.parse(currentUser);
      const userId = userData._id || userData.id;
      
      if (!userId) {
        // If no user ID, use localStorage data
        setUser({
          ...userData,
          joinDate: new Date(userData.createdAt).toLocaleDateString() || "2023-01-15"
        });
        setLoading(false);
        return;
      }
      
      const response = await api.get(`/api/users/profile?userId=${userId}`);
      if (response.data) {
        setUser({
          ...response.data,
          joinDate: new Date(response.data.createdAt).toLocaleDateString() || "2023-01-15"
        });
        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(response.data));
        // Dispatch custom event to update header
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: response.data }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // If API fails, try to get user from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser({
          ...userData,
          joinDate: new Date(userData.createdAt).toLocaleDateString() || "2023-01-15"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 p-4 lg:p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 mb-8">
          <p className="text-gray-900">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-4 lg:space-y-0">

          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-xl sm:text-2xl text-gray-600">{user?.username?.charAt(0)?.toUpperCase() || '?'}</span>
              </div>
            )}

            <div className="text-center sm:text-left flex-1">
              {!editing ? (
                <>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    {user?.username || user?.name || 'User'}
                  </h1>

                  <p className="text-gray-600 font-medium mb-2">{user?.email}</p>

                  <p className="text-gray-700 text-base lg:text-lg max-w-md mb-2">{user?.bio || 'No bio available'}</p>

                  <p className="text-gray-600 text-sm">
                    Joined {user?.joinDate}
                  </p>
                </>
              ) : (
                <EditProfile
                  user={user}
                  setUser={setUser}
                  onSaved={(updatedUser) => {
                    setUser(updatedUser);
                    setEditing(false);
                    fetchProfile();
                    // Dispatch custom event to update header
                    window.dispatchEvent(new CustomEvent('profileUpdated', { detail: updatedUser }));
                  }}
                  onCancel={() => setEditing(false)}
                />
              )}
            </div>
          </div>

          {/* Edit Button */}
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition self-center lg:self-start"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
