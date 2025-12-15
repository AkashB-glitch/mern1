import api from "../api/config";
import { useState } from "react";

export default function EditProfile({ user, setUser, onSaved, onCancel }) {

  const [form, setForm] = useState({
    _id: user?._id,
    username: user?.username || user?.name || "", 
    email: user?.email || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Don't send _id in the body, only send the fields to update
      const { _id, ...updateData } = form;
      
      const res = await api.put(
        `/api/users/update/${_id}`,
        updateData
      );

      const updated = res?.data?.user;

      if (updated) {
        setUser(updated);
        if (onSaved) onSaved(updated);
      } else {
        alert("Update returned no user");
      }
    } catch (err) {
      console.error("Failed to save profile", err);
      const errorMessage = err.response?.data?.message || "Failed to save profile";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile space-y-3">
      <input
        type="text"
        value={form.username} 
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="Username"
        className="w-64 p-2 border rounded-md bg-white text-gray-900"
      />

      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="w-64 p-2 border rounded-md bg-white text-gray-900"
      />

      <textarea
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        placeholder="Bio"
        rows={3}
        className="w-80 p-2 border rounded-md bg-white text-gray-900"
      />

      <input
        type="text"
        value={form.avatar}
        onChange={(e) => setForm({ ...form, avatar: e.target.value })}
        placeholder="Avatar URL"
        className="w-80 p-2 border rounded-md bg-white text-gray-900"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-teal-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded-md"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}