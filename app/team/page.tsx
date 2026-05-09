'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Linkedin, Github } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch, buildImageUrl } from '@/lib/api';

interface TeamMember {
  _id: string;
  name: string;
  department: string;
  role: string;
  avatar: string;
  linkedin: string;
  github: string;
}

const departments = ['All', 'Development', 'Marketing', 'Design', 'Management', 'Research'];

export default function TeamPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, selectedDepartment]);

  const fetchTeamMembers = async () => {
    try {
      const data = await apiFetch<TeamMember[]>('/team/members?status=approved');
      setMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = members;

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(member => member.department === selectedDepartment);
    }

    if (searchTerm) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };



  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 animate-pulse">
          <div className="w-32 h-32 rounded-full mx-auto bg-white/10 mb-6" />
          <div className="h-6 bg-white/10 rounded-full mb-4 mx-auto w-3/4" />
          <div className="h-4 bg-white/5 rounded-full mb-6 mx-auto w-1/2" />
          <div className="h-3 bg-white/5 rounded-full mb-8 mx-auto w-full" />
          <div className="flex justify-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/5" />
            <div className="w-10 h-10 rounded-2xl bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30 selection:text-white">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter text-white mb-6 sm:text-7xl uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">Our</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">Team</span>
          </h1>
          <p className="text-lg font-light text-white/80 max-w-2xl mx-auto tracking-wide">
            Meet the elite engineers and visionaries driving the next generation of SaaS innovation.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all tracking-widest uppercase ${
                    selectedDepartment === dept
                      ? 'bg-white text-[#0a0520] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMembers.map((member) => (
              <div key={member._id} className="uiverse-parent group">
                <div 
                  className="uiverse-card"
                  style={{ '--card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' } as any}
                >
                  <div className="uiverse-glass" />
                  
                  <div className="uiverse-logo">
                    <span className="uiverse-circle uiverse-circle1"></span>
                    <span className="uiverse-circle uiverse-circle2"></span>
                    <span className="uiverse-circle uiverse-circle3"></span>
                    <span className="uiverse-circle uiverse-circle4"></span>
                    <span className="uiverse-circle uiverse-circle5">
                      <Linkedin className="w-5 h-5 text-white" />
                    </span>
                  </div>

                  <div className="uiverse-content">
                    <div className="mb-6 relative w-fit">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                      {member.avatar ? (
                        <img
                          src={buildImageUrl(member.avatar)}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover border-2 border-white/10 relative z-10"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-2xl font-bold border-2 border-white/10 relative z-10">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <span className="title group-hover:text-emerald-400 transition-colors duration-300">{member.name}</span>
                    
                    <div className="inline-block px-3 py-1 bg-white/10 text-white/80 text-[8px] font-black rounded-full mt-4 mb-2 tracking-widest uppercase border border-white/5">
                      {member.department}
                    </div>
                    
                    <span className="text italic">"{member.role}"</span>
                  </div>

                  <div className="uiverse-bottom">
                    <div className="social-buttons-container">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-button"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-button"
                        >
                          <Github className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-24 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 mt-12">
            <p className="text-white/40 text-xl font-light italic">No visionaries found in this sector.</p>
          </div>
        )}
      </div>
    </div>
  );
}