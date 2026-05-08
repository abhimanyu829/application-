'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Plus, Edit, Trash2, X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TeamMember {
  _id: string;
  name: string;
  department: string;
  role: string;
  profileImage: string;
  linkedin: string;
  github: string;
  status?: string;
  email?: string;
}

export default function AdminTeamPanel() {
  const { admin, logout } = useAdminAuth();
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: '',
    profileImage: '',
    linkedin: '',
    github: '',
    status: 'approved',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      fetchMembers();
      
      // Poll for updates every 4 seconds
      const interval = setInterval(() => {
        fetchMembers(true);
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [admin]);

  const fetchMembers = async (isBackground = false) => {
    try {
      if (!isBackground) setFetchLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/members`);
      if (response.ok) {
        const data = await response.json();
        // Only update state if data has changed to avoid unnecessary re-renders
        // For simplicity in this demo, we'll just update it. React handles simple diffs well.
        setMembers(data);
      } else {
        console.error('Failed to fetch team members');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      if (!isBackground) setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const url = editingMember 
        ? `${process.env.NEXT_PUBLIC_API_URL}/team/${editingMember._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/team/add-member`;
      
      const method = editingMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchMembers();
        resetForm();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to save team member');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('An error occurred while saving the team member');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      department: member.department,
      role: member.role,
      profileImage: member.profileImage,
      linkedin: member.linkedin,
      github: member.github,
      status: member.status || 'approved',
      email: member.email || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchMembers();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('An error occurred while deleting the team member');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      department: '',
      role: '',
      profileImage: '',
      linkedin: '',
      github: '',
      status: 'approved',
      email: '',
    });
    setEditingMember(null);
    setShowForm(false);
  };

  const departments = ['Development', 'Marketing', 'Design', 'Management', 'Research'];

  if (!admin) {
    return null; // Will be handled by AdminAuthGuard
  }

  return (
    <div className="min-h-screen bg-[#0a0520] py-32 relative overflow-hidden px-4">
      {/* Aurora Background */}
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-white">Team Management</h1>
            <p className="text-sm text-white/60 mt-2 font-light">Welcome, {admin.username}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-[#0a0520] px-6 py-3 rounded-xl hover:bg-white/90 transition-all active:scale-[0.98] flex items-center gap-2 font-bold tracking-tight shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/20 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-black/80 backdrop-blur-2xl rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto scroll-smooth border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {editingMember ? 'Edit Elite Member' : 'Add New Member'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Profile Image URL</label>
                  <input
                    type="url"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="flex gap-4 pt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-white text-[#0a0520] py-3 rounded-xl hover:bg-white/90 transition-all active:scale-[0.98] font-bold shadow-lg disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : (editingMember ? 'Update Member' : 'Onboard Member')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-white/5 text-white py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {fetchLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-white/60">Loading team members...</td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-white/60">No team members found. Add your first member!</td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                        {member.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          member.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          member.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {member.status || 'approved'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 text-white/60 hover:text-white transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="p-2 text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}