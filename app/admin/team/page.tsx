'use client';

import { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Plus, Edit, Trash2, X, LogOut, Upload, ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiFetch, apiUpload, buildImageUrl } from '@/lib/api';

interface TeamMember {
  _id: string;
  name: string;
  department: string;
  role: string;
  avatar: string;
  linkedin: string;
  github: string;
  status?: string;
  email?: string;
}

export default function AdminTeamPanel() {
  const { admin, logout } = useAdminAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (admin) {
      fetchMembers();
      // Poll for updates every 4 seconds
      const interval = setInterval(() => fetchMembers(true), 4000);
      return () => clearInterval(interval);
    }
  }, [admin]);

  const fetchMembers = async (isBackground = false) => {
    try {
      if (!isBackground) setFetchLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) { router.push('/admin/login'); return; }

      const raw = await apiFetch<unknown>('/team/members', { token });
      // Normalise: backend may return { members:[...] }, { data:[...] }, or a raw array
      const arr: TeamMember[] = Array.isArray(raw)
        ? (raw as TeamMember[])
        : Array.isArray((raw as any)?.members)
          ? (raw as any).members
          : Array.isArray((raw as any)?.data)
            ? (raw as any).data
            : [];
      setMembers(arr);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setMembers([]);
    } finally {
      if (!isBackground) setFetchLoading(false);
    }
  };

  // Handle image file selection → upload via multer + sharp
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    try {
      setUploadLoading(true);
      setError(null);
      const token = localStorage.getItem('adminToken') || undefined;

      const fd = new FormData();
      fd.append('image', file);

      const result = await apiUpload<{ imagePath: string }>('/team/upload-image', fd, token);
      setFormData((prev) => ({ ...prev, profileImage: result.imagePath }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
      setImagePreview(null);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken') || undefined;
      if (!token) { router.push('/admin/login'); return; }

      if (editingMember) {
        await apiFetch(`/team/${editingMember._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
          token,
        });
      } else {
        await apiFetch('/team/add-member', {
          method: 'POST',
          body: JSON.stringify(formData),
          token,
        });
      }

      await fetchMembers();
      resetForm();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save team member';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setImagePreview(member.avatar ? buildImageUrl(member.avatar) : null);
    setFormData({
      name: member.name,
      department: member.department,
      role: member.role,
      profileImage: member.avatar || '',
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
      const token = localStorage.getItem('adminToken') || undefined;
      if (!token) { router.push('/admin/login'); return; }
      await apiFetch(`/team/${id}`, { method: 'DELETE', token });
      await fetchMembers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete team member';
      alert(msg);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', department: '', role: '', profileImage: '', linkedin: '', github: '', status: 'approved', email: '' });
    setEditingMember(null);
    setShowForm(false);
    setImagePreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const departments = ['Development', 'Marketing', 'Design', 'Management', 'Research'];

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-[#0a0520] py-32 relative overflow-hidden px-4">
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

        {/* Add/Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-black/80 backdrop-blur-2xl rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto scroll-smooth border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {editingMember ? 'Edit Elite Member' : 'Add New Member'}
                </h2>
                <button onClick={resetForm} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Department</label>
                  <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all" required>
                    <option value="">Select Department</option>
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Role</label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all" required />
                </div>

                {/* Profile Image — Upload or URL */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Profile Image</label>

                  {/* Preview */}
                  {imagePreview && (
                    <div className="mb-3 flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
                      <span className="text-xs text-white/50">Preview</span>
                    </div>
                  )}

                  {/* File upload */}
                  <div
                    className="flex items-center gap-3 border border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadLoading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5 text-white/50" />
                    )}
                    <span className="text-sm text-white/50">
                      {uploadLoading ? 'Uploading & compressing...' : 'Click to upload image (auto-compressed to WebP)'}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* OR URL fallback */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-xs text-white/30">or paste URL</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <input
                      type="url"
                      value={formData.profileImage.startsWith('/uploads') ? '' : formData.profileImage}
                      onChange={(e) => {
                        setFormData({ ...formData, profileImage: e.target.value });
                        setImagePreview(e.target.value || null);
                      }}
                      className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all text-sm"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">LinkedIn URL</label>
                  <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    placeholder="https://linkedin.com/in/username" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">GitHub URL</label>
                  <input type="url" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    placeholder="https://github.com/username" />
                </div>

                <div className="flex gap-4 pt-8">
                  <button type="submit" disabled={loading || uploadLoading}
                    className="flex-1 bg-white text-[#0a0520] py-3 rounded-xl hover:bg-white/90 transition-all active:scale-[0.98] font-bold shadow-lg disabled:opacity-50">
                    {loading ? 'Processing...' : editingMember ? 'Update Member' : 'Onboard Member'}
                  </button>
                  <button type="button" onClick={resetForm}
                    className="flex-1 bg-white/5 text-white py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Members Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {fetchLoading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                      </td>
                    </tr>
                  ))
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-white/60">
                      No team members found. Add your first member!
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {member.avatar ? (
                            <img src={buildImageUrl(member.avatar)} alt={member.name}
                              className="w-8 h-8 rounded-full object-cover border border-white/10" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-white/30" />
                            </div>
                          )}
                          <span className="text-sm font-medium text-white">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">{member.department}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{member.role}</td>
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
                          <button onClick={() => handleEdit(member)} className="p-2 text-white/60 hover:text-white transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(member._id)} className="p-2 text-red-500/60 hover:text-red-400 transition-colors" title="Delete">
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