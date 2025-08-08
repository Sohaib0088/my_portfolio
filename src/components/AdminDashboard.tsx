import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, LogOut, X } from 'lucide-react';
import { apiService, Project, Skill, Experience, Contact } from '../services/api';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToPortfolio: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBackToPortfolio }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experiences' | 'contacts'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, skillsData, experiencesData, contactsData] = await Promise.all([
        apiService.getProjects(),
        apiService.getSkills(),
        apiService.getExperiences(),
        apiService.getContacts()
      ]);
      
      setProjects(projectsData);
      setSkills(skillsData);
      setExperiences(experiencesData);
      setContacts(contactsData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Portfolio Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToPortfolio}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back to Portfolio
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'projects', label: 'Projects', count: projects.length },
              { id: 'skills', label: 'Skills', count: skills.length },
              { id: 'experiences', label: 'Experience', count: experiences.length },
              { id: 'contacts', label: 'Contacts', count: contacts.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'projects' && (
            <ProjectsTab projects={projects} onRefresh={loadData} />
          )}
          {activeTab === 'skills' && (
            <SkillsTab skills={skills} onRefresh={loadData} />
          )}
          {activeTab === 'experiences' && (
            <ExperiencesTab experiences={experiences} onRefresh={loadData} />
          )}
          {activeTab === 'contacts' && (
            <ContactsTab contacts={contacts} onRefresh={loadData} />
          )}
        </div>
      </main>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab: React.FC<{ projects: Project[]; onRefresh: () => void }> = ({ projects, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    technologies: '',
    featured: false,
    order: 0,
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', technologies: '', featured: false, order: 0 });
    setIsOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      technologies: p.technologies,
      featured: p.featured,
      order: p.order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await apiService.deleteProject(id);
      await onRefresh();
    } catch (e) {
      alert('Failed to delete project');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editing) {
        await apiService.updateProject(editing.id, form);
      } else {
        await apiService.createProject({
          title: form.title || '',
          description: form.description || '',
          imageUrl: form.imageUrl,
          githubUrl: form.githubUrl,
          liveUrl: form.liveUrl,
          technologies: (form.technologies as string) || '',
          featured: !!form.featured,
          order: form.order ?? 0,
        });
      }
      setIsOpen(false);
      await onRefresh();
    } catch (e) {
      alert('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const res = await apiService.uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: res.url }));
    } catch (e) {
      alert('Image upload failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <button onClick={openAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <li key={project.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {project.imageUrl && (
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={project.imageUrl}
                        alt={project.title}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{project.description.substring(0, 100)}...</div>
                    <div className="flex items-center mt-1">
                      {project.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => openEdit(project)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Title</label>
                  <input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Order</label>
                  <input type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">GitHub URL</label>
                  <input value={form.githubUrl || ''} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Live URL</label>
                  <input value={form.liveUrl || ''} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Technologies (comma separated)</label>
                  <input value={form.technologies || ''} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div className="flex items-center space-x-3 mt-6">
                  <input id="featured" type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4" />
                  <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">Featured</label>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Image</label>
                <div className="flex items-center space-x-3">
                  <input value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/uploads/filename.jpg" className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                  <label className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Skills Tab Component
const SkillsTab: React.FC<{ skills: Skill[]; onRefresh: () => void }> = ({ skills, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<Partial<Skill>>({ name: '', category: '', level: 1, icon: '', order: 0 });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', category: '', level: 1, icon: '', order: 0 });
    setIsOpen(true);
  };

  const openEdit = (s: Skill) => {
    setEditing(s);
    setForm({ name: s.name, category: s.category, level: s.level, icon: s.icon, order: s.order });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await apiService.deleteSkill(id);
      await onRefresh();
    } catch (e) {
      alert('Failed to delete skill');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editing) {
        await apiService.updateSkill(editing.id, form);
      } else {
        await apiService.createSkill({
          name: form.name || '',
          category: form.category || '',
          level: form.level ?? 1,
          icon: form.icon,
          order: form.order ?? 0,
        });
      }
      setIsOpen(false);
      await onRefresh();
    } catch (e) {
      alert('Failed to save skill');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
        <button onClick={openAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {skills.map((skill) => (
            <li key={skill.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{skill.category} • Level {skill.level}/5</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => openEdit(skill)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Name</label>
                  <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Category</label>
                  <input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Level (1-5)</label>
                  <input type="number" min={1} max={5} value={form.level ?? 1} onChange={(e) => setForm({ ...form, level: Math.max(1, Math.min(5, Number(e.target.value))) })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Order</label>
                  <input type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Icon (emoji or URL)</label>
                  <input value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Experiences Tab Component
const ExperiencesTab: React.FC<{ experiences: Experience[]; onRefresh: () => void }> = ({ experiences, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<Partial<Experience>>({
    title: '',
    company: '',
    location: '',
    startDate: new Date().toISOString(),
    endDate: '',
    current: false,
    description: '',
    technologies: '',
    order: 0,
  } as any);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', company: '', location: '', startDate: new Date().toISOString().slice(0, 10), endDate: '', current: false, description: '', technologies: '', order: 0 } as any);
    setIsOpen(true);
  };

  const openEdit = (e: Experience) => {
    setEditing(e);
    setForm({
      title: e.title,
      company: e.company,
      location: e.location,
      startDate: e.startDate?.slice(0, 10),
      endDate: e.endDate ? e.endDate.slice(0, 10) : '',
      current: e.current,
      description: e.description,
      technologies: e.technologies,
      order: e.order,
    } as any);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await apiService.deleteExperience(id);
      await onRefresh();
    } catch (e) {
      alert('Failed to delete experience');
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsSaving(true);
    try {
      const payload: any = {
        ...form,
        startDate: form.startDate ? new Date(form.startDate as string).toISOString() : undefined,
        endDate: form.endDate ? new Date(form.endDate as string).toISOString() : undefined,
      };
      if (editing) {
        await apiService.updateExperience(editing.id, payload);
      } else {
        await apiService.createExperience(payload);
      }
      setIsOpen(false);
      await onRefresh();
    } catch (e) {
      alert('Failed to save experience');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Experience</h2>
        <button onClick={openAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {experiences.map((experience) => (
            <li key={experience.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{experience.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{experience.company} • {experience.location}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(experience.startDate).toLocaleDateString()} - {experience.current ? 'Present' : experience.endDate ? new Date(experience.endDate).toLocaleDateString() : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => openEdit(experience)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(experience.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{editing ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Title</label>
                  <input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Company</label>
                  <input value={form.company || ''} onChange={(e) => setForm({ ...form, company: e.target.value })} required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Location</label>
                  <input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div className="flex items-center space-x-3 mt-6">
                  <input id="currentRole" type="checkbox" checked={!!form.current} onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? '' : form.endDate })} className="h-4 w-4" />
                  <label htmlFor="currentRole" className="text-sm text-gray-700 dark:text-gray-300">Current Role</label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Start Date</label>
                  <input type="date" value={(form.startDate as string) || ''} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">End Date</label>
                  <input type="date" disabled={!!form.current} value={(form.endDate as string) || ''} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2 disabled:opacity-60" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Technologies (comma separated)</label>
                  <input value={(form.technologies as any) || ''} onChange={(e) => setForm({ ...form, technologies: e.target.value as any })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Order</label>
                  <input type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Contacts Tab Component
const ContactsTab: React.FC<{ contacts: Contact[]; onRefresh: () => void }> = ({ contacts, onRefresh }) => {
  const handleMarkRead = async (id: string) => {
    try {
      await apiService.markContactAsRead(id);
      await onRefresh();
    } catch (e) {
      alert('Failed to mark as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await apiService.deleteContact(id);
      await onRefresh();
    } catch (e) {
      alert('Failed to delete message');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Messages</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {contacts.map((contact) => (
            <li key={contact.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{contact.name} • {contact.email}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{contact.subject}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{contact.message.substring(0, 100)}...</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(contact.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!contact.read && (
                    <button onClick={() => handleMarkRead(contact.id)} className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="Mark as read">
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => handleDelete(contact.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard; 