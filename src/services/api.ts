const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface About {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

class ApiService {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.data.token) {
      this.token = response.data.token;
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (response.success && response.data.token) {
      this.token = response.data.token;
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const response = await this.request<Project[]>('/projects');
    return response.data;
  }

  async getProject(id: string): Promise<Project> {
    const response = await this.request<Project>(`/projects/${id}`);
    return response.data;
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const response = await this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    return response.data;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    await this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    const response = await this.request<Skill[]>('/skills');
    return response.data;
  }

  async createSkill(skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill> {
    const response = await this.request<Skill>('/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
    return response.data;
  }

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    const response = await this.request<Skill>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill),
    });
    return response.data;
  }

  async deleteSkill(id: string): Promise<void> {
    await this.request(`/skills/${id}`, {
      method: 'DELETE',
    });
  }

  // Experience
  async getExperiences(): Promise<Experience[]> {
    const response = await this.request<Experience[]>('/experiences');
    return response.data;
  }

  async createExperience(experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience> {
    const response = await this.request<Experience>('/experiences', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
    return response.data;
  }

  async updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
    const response = await this.request<Experience>(`/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experience),
    });
    return response.data;
  }

  async deleteExperience(id: string): Promise<void> {
    await this.request(`/experiences/${id}`, {
      method: 'DELETE',
    });
  }

  // About
  async getAbout(): Promise<About[]> {
    const response = await this.request<About[]>('/about');
    return response.data;
  }

  async createAbout(about: Omit<About, 'id' | 'createdAt' | 'updatedAt'>): Promise<About> {
    const response = await this.request<About>('/about', {
      method: 'POST',
      body: JSON.stringify(about),
    });
    return response.data;
  }

  async updateAbout(id: string, about: Partial<About>): Promise<About> {
    const response = await this.request<About>(`/about/${id}`, {
      method: 'PUT',
      body: JSON.stringify(about),
    });
    return response.data;
  }

  async deleteAbout(id: string): Promise<void> {
    await this.request(`/about/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact
  async submitContact(contact: Omit<Contact, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const response = await this.request<Contact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
    return response.data;
  }

  async getContacts(): Promise<Contact[]> {
    const response = await this.request<Contact[]>('/contacts');
    return response.data;
  }

  async markContactAsRead(id: string): Promise<Contact> {
    const response = await this.request<Contact>(`/contacts/${id}/read`, {
      method: 'PUT',
    });
    return response.data;
  }

  async deleteContact(id: string): Promise<void> {
    await this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // File Upload
  async uploadImage(file: File): Promise<{ filename: string; url: string; size: number }> {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${this.baseUrl}/upload/image`;
    
    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    return data.data;
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string; environment: string }> {
    const response = await this.request<{ status: string; timestamp: string; environment: string }>('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export type { Project, Skill, Experience, About, Contact, AuthResponse }; 