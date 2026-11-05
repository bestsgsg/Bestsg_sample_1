import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Search,
  LogOut,
  User,
  FileText,
  Settings,
  Menu,
  X,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company?: string;
  service: string;
  details: string;
  budget?: string;
  timeline?: string;
  created_at: string;
}

interface TeamMember {
  id: number;
  name: string;
  title: string; // Changed from 'role'
  image: string;
  bio: string;
  skills: string[];
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

// Portfolio Project Form Component
const PortfolioProjectForm = ({
  project,
  portfolioFormData,
  setPortfolioFormData,
  portfolioFormErrors,
  selectedPortfolioImageFiles,
  setSelectedPortfolioImageFiles,
  onSave,
  onCancel
}: {
  project: PortfolioProject | null;
  portfolioFormData: any;
  setPortfolioFormData: React.Dispatch<React.SetStateAction<any>>;
  portfolioFormErrors: {[key: string]: string};
  selectedPortfolioImageFiles: File[];
  setSelectedPortfolioImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {project ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={portfolioFormData.title}
              onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, title: e.target.value}))}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                portfolioFormErrors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter project title"
              required
            />
            {portfolioFormErrors.title && (
              <p className="text-sm text-red-600 mt-1">{portfolioFormErrors.title}</p>
            )}
          </div>
          <div>
            <select
  value={portfolioFormData.category}
  onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, category: e.target.value}))}
  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
    portfolioFormErrors.category ? 'border-red-500' : 'border-gray-300'
  }`}
  required
>
  <option value="">Select Category</option>
  <option value="ecommerce">E-Commerce</option>
  <option value="webapp">Web Apps</option>
  <option value="mobile">Mobile</option>
  <option value="custom">Custom Solutions</option>
</select>

          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={portfolioFormData.description}
            onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, description: e.target.value}))}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              portfolioFormErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Describe the project"
            required
          />
          {portfolioFormErrors.description && (
            <p className="text-sm text-red-600 mt-1">{portfolioFormErrors.description}</p>
          )}
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Images *</label>
  <div className="flex space-x-2">
    <input
      type="text"
      value={selectedPortfolioImageFiles.map(f => f.name).join(', ')}
      className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
        portfolioFormErrors.images ? 'border-red-500' : 'border-gray-300'
      }`}
      placeholder="Click browse to select images"
      required
      readOnly
    />
    <button
      type="button"
      onClick={() => document.getElementById('portfolio-image-upload')?.click()}
      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
    >
      Browse
    </button>
  </div>
  {portfolioFormErrors.images && (
    <p className="text-sm text-red-600 mt-1">{portfolioFormErrors.images}</p>
  )}
  <input
    id="portfolio-image-upload"
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      const files = Array.from(e.target.files || []);
      setSelectedPortfolioImageFiles(files);
      setPortfolioFormData((prev: any) => ({
        ...prev,
        images: files.map(f => f.name).join(', ')
      }));
      if (portfolioFormErrors.images) {
        setPortfolioFormData((prev: any) => ({...prev}));
      }
    }}
    className="hidden"
  />
  <p className="text-xs text-gray-500 mt-1">Select multiple images</p>
</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack *</label>
          <input
            type="text"
            value={portfolioFormData.tech}
            onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, tech: e.target.value}))}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              portfolioFormErrors.tech ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., React, Node.js, MongoDB"
            required
          />
          {portfolioFormErrors.tech && (
            <p className="text-sm text-red-600 mt-1">{portfolioFormErrors.tech}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
            <input
              type="url"
              value={portfolioFormData.liveUrl}
              onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, liveUrl: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input
              type="url"
              value={portfolioFormData.githubUrl}
              onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, githubUrl: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={portfolioFormData.featured}
              onChange={(e) => setPortfolioFormData((prev: any) => ({...prev, featured: e.target.checked}))}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Featured Project</span>
          </label>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {project ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Team Member Form Component
const TeamMemberForm = ({
  member,
  teamFormData,
  setTeamFormData,
  teamFormErrors,
  selectedImageFiles,
  setSelectedImageFiles,
  editingTeamMember,
  teamMembers,
  onSave,
  onCancel
}: {
  member: TeamMember | null;
  teamFormData: any;
  setTeamFormData: React.Dispatch<React.SetStateAction<any>>;
  teamFormErrors: {[key: string]: string};
  selectedImageFiles: {[key: number]: File};
  setSelectedImageFiles: React.Dispatch<React.SetStateAction<{[key: number]: File}>>;
  editingTeamMember: TeamMember | null;
  teamMembers: TeamMember[];
  onSave: () => void;
  onCancel: () => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create object URL for immediate preview
      const objectUrl = URL.createObjectURL(file);
      setTeamFormData((prev: any) => ({...prev, image: objectUrl}));

      // Store the file for upload
      const memberId = editingTeamMember?.id || (Math.max(...teamMembers.map(m => m.id), 0) + 1);
      setSelectedImageFiles(prev => ({
        ...prev,
        [memberId]: file
      }));

      // Clear any image error
      if (teamFormErrors.image) {
        setTeamFormData((prev: any) => ({...prev, image: prev.image})); // Trigger re-render
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {member ? 'Edit Team Member' : 'Add New Team Member'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={teamFormData.name}
              onChange={(e) => setTeamFormData((prev: any) => ({...prev, name: e.target.value}))}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                teamFormErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
              required
            />
            {teamFormErrors.name && (
              <p className="text-sm text-red-600 mt-1">{teamFormErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={teamFormData.title}
              onChange={(e) => setTeamFormData((prev: any) => ({...prev, title: e.target.value}))}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                teamFormErrors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., CEO & Founder, Lead Developer"
              required
            />
            {teamFormErrors.title && (
              <p className="text-sm text-red-600 mt-1">{teamFormErrors.title}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image *</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={teamFormData.image}
              onChange={(e) => setTeamFormData((prev: any) => ({...prev, image: e.target.value}))}
              className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                teamFormErrors.image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Click browse to select image"
              required
            />
            <button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Browse
            </button>
          </div>
          {teamFormErrors.image && (
            <p className="text-sm text-red-600 mt-1">{teamFormErrors.image}</p>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {teamFormData.image && (
            <div className="mt-2">
              <img src={teamFormData.image} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
          <textarea
            value={teamFormData.bio}
            onChange={(e) => setTeamFormData((prev: any) => ({...prev, bio: e.target.value}))}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              teamFormErrors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            required
          />
          {teamFormErrors.bio && (
            <p className="text-sm text-red-600 mt-1">{teamFormErrors.bio}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
          <input
            type="text"
            value={teamFormData.skills}
            onChange={(e) => setTeamFormData((prev: any) => ({...prev, skills: e.target.value}))}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              teamFormErrors.skills ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., React, Node.js, Python"
            required
          />
          {teamFormErrors.skills && (
            <p className="text-sm text-red-600 mt-1">{teamFormErrors.skills}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
           <input
             type="url"
             value={teamFormData.social.linkedin}
             onChange={(e) => setTeamFormData((prev: any) => ({...prev, social: {...prev.social, linkedin: e.target.value}}))}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             placeholder="https://linkedin.com/in/username"
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
           <input
             type="url"
             value={teamFormData.social.twitter}
             onChange={(e) => setTeamFormData((prev: any) => ({...prev, social: {...prev.social, twitter: e.target.value}}))}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             placeholder="https://twitter.com/username"
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
           <input
             type="url"
             value={teamFormData.social.github}
             onChange={(e) => setTeamFormData((prev: any) => ({...prev, social: {...prev.social, github: e.target.value}}))}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             placeholder="https://github.com/username"
           />
         </div>
       </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {member ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<{[key: number]: File}>({});
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [editingPortfolioProject, setEditingPortfolioProject] = useState<PortfolioProject | null>(null);
  const [portfolioFormData, setPortfolioFormData] = useState({
    title: '',
    category: '',
    description: '',
    images: '',
    tech: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [portfolioFormErrors, setPortfolioFormErrors] = useState<{[key: string]: string}>({});
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    title: '', 
    image: '',
    bio: '',
    skills: '',
    social: {
      linkedin: '',
      twitter: '',
      github: '',
    }
  });
  const [teamFormErrors, setTeamFormErrors] = useState<{[key: string]: string}>({});
  const [selectedPortfolioImageFiles, setSelectedPortfolioImageFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // UPDATED: Using Node.js/Express routes without .php
    const fetchData = async () => {
      try {
        // Fetch inquiries
        const inquiriesResponse = await fetch('/backend/get_inquiries');
        if (inquiriesResponse.ok) {
          const inquiriesData = await inquiriesResponse.json();
          setInquiries(inquiriesData);
          setFilteredInquiries(inquiriesData);
        }

        // Fetch team members
        const teamResponse = await fetch('/backend/get_team');
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setTeamMembers(teamData);
        }

        // Fetch portfolio projects
        const portfolioResponse = await fetch('/backend/get_portfolio');
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          setPortfolioProjects(portfolioData);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred while fetching data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(inquiry =>
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedService) {
      filtered = filtered.filter(inquiry => inquiry.service === selectedService);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, selectedService, inquiries]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingTeamMember(member);
    setTeamFormData({
      name: member.name,
      title: member.title, 
      image: member.image,
      bio: member.bio,
      skills: member.skills.join(', '),
      social: member.social
    });
    setTeamFormErrors({});
    setShowTeamForm(true);
  };

  const handleEditPortfolioProject = (project: PortfolioProject) => {
    setEditingPortfolioProject(project);
    setPortfolioFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      images: project.images.join(', '),
      tech: project.tech.join(', '),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured
    });
    setPortfolioFormErrors({});
    setShowPortfolioForm(true);
  };

  // UPDATED: Using Node.js/Express route /backend/save_portfolio
  const handleDeletePortfolioProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this portfolio project? This action cannot be undone.')) {
      try {
        const updatedProjects = portfolioProjects.filter(project => project.id !== id);
        
        // Save updated portfolio data to backend
        const saveResponse = await fetch('/backend/save_portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProjects)
        });
        
        if (!saveResponse.ok) {
             throw new Error('Server error during deletion save.');
        }

        setPortfolioProjects(updatedProjects);
        
        toast({
          title: "Portfolio Project Deleted",
          description: "The portfolio project has been successfully deleted.",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete portfolio project.",
          variant: "destructive",
        });
      }
    }
  };

  // UPDATED: Using Node.js/Express routes /backend/save_portfolio and /backend/get_portfolio
  const handleSavePortfolioProject = async () => {
    try {
      // Validate required fields
      const errors: {[key: string]: string} = {};

      if (!portfolioFormData.title?.trim()) { errors.title = "Title is required."; }
      if (!portfolioFormData.category?.trim()) { errors.category = "Category is required."; }
      if (!portfolioFormData.description?.trim()) { errors.description = "Description is required."; }
      if (selectedPortfolioImageFiles.length === 0 && !portfolioFormData.images?.trim()) { errors.images = "At least one image is required."; }
      if (!portfolioFormData.tech?.trim()) { errors.tech = "Tech stack is required."; }

      if (Object.keys(errors).length > 0) {
        setPortfolioFormErrors(errors);
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Upload images if new files were selected
      let uploadedImagePaths: string[] = [];
      if (selectedPortfolioImageFiles.length > 0) {
        for (const file of selectedPortfolioImageFiles) {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('memberId', 'portfolio'); // Use 'portfolio' as identifier

          const uploadResponse = await fetch('/backend/upload_image', {
            method: 'POST',
            body: formData
          });

          if (uploadResponse.ok) {
            const result = await uploadResponse.json();
            if (result.success) {
              uploadedImagePaths.push(result.imagePath);
            }
          }
        }
      }

      const projectData: Omit<PortfolioProject, 'id'> = {
        title: portfolioFormData.title.trim(),
        category: portfolioFormData.category.trim(),
        description: portfolioFormData.description.trim(),
        images: uploadedImagePaths.length > 0 ? uploadedImagePaths : portfolioFormData.images.split(',').map(s => s.trim()).filter(s => s),
        tech: portfolioFormData.tech.split(',').map(s => s.trim()).filter(s => s),
        liveUrl: portfolioFormData.liveUrl.trim(),
        githubUrl: portfolioFormData.githubUrl.trim(),
        featured: portfolioFormData.featured
      };

      let updatedProjects: PortfolioProject[];

      if (editingPortfolioProject) {
        // Update existing project
        updatedProjects = portfolioProjects.map(project =>
          project.id === editingPortfolioProject.id
            ? { ...projectData, id: editingPortfolioProject.id }
            : project
        );
      } else {
        // Add new project
        const newId = Math.max(...portfolioProjects.map(p => p.id), 0) + 1;
        const newProject: PortfolioProject = {
          ...projectData,
          id: newId
        };
        updatedProjects = [...portfolioProjects, newProject];
      }

      // Save portfolio data to backend
      const saveResponse = await fetch('/backend/save_portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProjects)
      });
      
      if (!saveResponse.ok) {
          const errorData = await saveResponse.json();
          throw new Error(errorData.message || 'Failed to save portfolio projects to server.');
      }
      
      // Force a re-fetch to ensure frontend gets latest data
      const portfolioResponse = await fetch('/backend/get_portfolio');
      const latestPortfolioData = await portfolioResponse.json();
      setPortfolioProjects(latestPortfolioData);

      toast({
        title: editingPortfolioProject ? "Portfolio Project Updated" : "Portfolio Project Added",
        description: editingPortfolioProject ? "The portfolio project has been successfully updated." : "The new portfolio project has been successfully added.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save portfolio project.",
        variant: "destructive",
      });
    } finally {
      setShowPortfolioForm(false);
      setEditingPortfolioProject(null);
      setPortfolioFormData({
        title: '',
        category: '',
        description: '',
        images: '',
        tech: '',
        liveUrl: '',
        githubUrl: '',
        featured: false
      });
      setPortfolioFormErrors({});
    }
  };

  // UPDATED: Using Node.js/Express route /backend/save_team
  const handleDeleteTeamMember = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      try {
        const updatedMembers = teamMembers.filter(member => member.id !== id);
        
        // Save updated team data to backend
        const saveResponse = await fetch('/backend/save_team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedMembers)
        });
        
        if (!saveResponse.ok) {
             throw new Error('Server error during deletion save.');
        }

        setTeamMembers(updatedMembers);

        // Remove the selected image file if it exists (client-side only cleanup)
        if (selectedImageFiles[id]) {
          const newSelectedImageFiles = { ...selectedImageFiles };
          delete newSelectedImageFiles[id];
          setSelectedImageFiles(newSelectedImageFiles);
        }

        toast({
          title: "Team Member Deleted",
          description: "The team member has been successfully deleted.",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete team member.",
          variant: "destructive",
        });
      }
    }
  };

  // UPDATED: Using Node.js/Express routes /backend/save_team, /backend/get_team, and /backend/upload_image
  const handleSaveTeamMember = async () => {
    try {
      // Validate required fields
      const errors: {[key: string]: string} = {};

      if (!teamFormData.name?.trim()) { errors.name = "Name is required."; }
      if (!teamFormData.title?.trim()) { errors.title = "Title is required."; }
      if (!teamFormData.bio?.trim()) { errors.bio = "Bio is required."; }
      if (!teamFormData.image?.trim()) { errors.image = "Profile image is required."; }
      if (!teamFormData.skills?.trim()) { errors.skills = "Skills are required."; }

      if (Object.keys(errors).length > 0) {
        setTeamFormErrors(errors);
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      const isEditing = !!editingTeamMember;
      const memberId = isEditing ? editingTeamMember!.id : Math.max(...teamMembers.map(m => m.id), 0) + 1;
      let savedImagePath = teamFormData.image;
      
      // Upload image file if a new file was selected
      if (selectedImageFiles[memberId]) {
        const imagePath = await saveImageFile(memberId, selectedImageFiles[memberId]);
        if (imagePath) {
            savedImagePath = imagePath;
        } else if (!isEditing) {
             // Block new member creation if image upload fails
             throw new Error("Image upload failed. Cannot add new member.");
        }
      }

      const memberData: Omit<TeamMember, 'id'> = {
        name: teamFormData.name.trim(),
        title: teamFormData.title.trim(), 
        image: savedImagePath,
        bio: teamFormData.bio.trim(),
        skills: teamFormData.skills.split(',').map(s => s.trim()).filter(s => s),
        social: teamFormData.social
      };

      let updatedMembers: TeamMember[];

      if (isEditing) {
        // Update existing member
        updatedMembers = teamMembers.map(member =>
          member.id === memberId
            ? { ...memberData, id: memberId }
            : member
        );
      } else {
        // Add new member
        const newMember: TeamMember = { ...memberData, id: memberId };
        updatedMembers = [...teamMembers, newMember];
      }

      // Save updated team data to backend
      const saveResponse = await fetch('/backend/save_team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMembers)
      });
      
      if (!saveResponse.ok) {
          const errorData = await saveResponse.json();
          throw new Error(errorData.message || 'Failed to save team members to server.');
      }
      
      // Force a re-fetch to ensure frontend gets latest data
      const teamResponse = await fetch('/backend/get_team');
      const latestTeamData = await teamResponse.json();
      setTeamMembers(latestTeamData);

      toast({
        title: isEditing ? "Team Member Updated" : "Team Member Added",
        description: isEditing ? "The team member has been successfully updated." : "The new team member has been successfully added.",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save team member.",
        variant: "destructive",
      });
    } finally {
      setShowTeamForm(false);
      setEditingTeamMember(null);
      setTeamFormData({
        name: '',
        title: '', 
        image: '',
        bio: '',
        skills: '',
        social: {
          linkedin: '',
          twitter: '',
          github: '',
        }
      });
      setTeamFormErrors({});
      // Clear selected image files
      setSelectedImageFiles({}); 
    }
  };

  // UPDATED: Using Node.js/Express route /backend/upload_image
  const saveImageFile = async (memberId: number, file: File): Promise<string | null> => {
    try {
      console.log('Starting image upload for member:', memberId, 'file:', file.name);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('memberId', memberId.toString());

      const uploadResponse = await fetch('/backend/upload_image', {
        method: 'POST',
        body: formData
      });

      console.log('Upload response status:', uploadResponse.status);

      if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        console.log('Upload result:', result);

        if (result.success) {
          console.log('Image uploaded successfully:', result.imagePath);
          return result.imagePath; 
        } else {
          console.error('Upload failed:', result.message);
          toast({
            title: "Upload Failed",
            description: result.message,
            variant: "destructive",
          });
        }
      } else {
        const errorText = await uploadResponse.text();
        console.error('Upload response error:', errorText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image file.",
        variant: "destructive",
      });
    }
    return null;
  };

  // Update the team component data by triggering a re-fetch or update
  useEffect(() => {
    // Store in localStorage for TeamSection1 to pickup
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    // Dispatch a custom event to notify TeamSection1 immediately
    window.dispatchEvent(new CustomEvent('teamUpdate', {
      detail: { teamMembers }
    }));
    console.log('Team members updated in admin dashboard:', teamMembers);
  }, [teamMembers]);

  const uniqueServices = [...new Set(inquiries.map(inquiry => inquiry.service))];

  const stats = {
    totalInquiries: inquiries.length,
    thisMonth: inquiries.filter(inquiry =>
      new Date(inquiry.created_at).getMonth() === new Date().getMonth()
    ).length,
    thisWeek: inquiries.filter(inquiry => {
      const inquiryDate = new Date(inquiry.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return inquiryDate >= weekAgo;
    }).length,
    avgResponseTime: '2.4 hours' // Placeholder
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-50">
      {/* App Bar (rest of the component structure remains the same) */}
      <div className="bg-white shadow-md border-b border-grey-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-grey-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-grey-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-medium text-grey-900">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-grey-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-grey-700 hover:bg-grey-100 rounded-full transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-grey-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-700 hover:border-grey-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'inquiries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-700 hover:border-grey-300'
              }`}
            >
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-700 hover:border-grey-300'
              }`}
            >
              Team
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-700 hover:border-grey-300'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-700 hover:border-grey-300'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-700 hover:border-grey-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Page Content */}
        <div className="p-6 bg-grey-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
                  <h2 className="text-2xl font-medium text-grey-900 mb-2">Welcome back, Administrator</h2>
                  <p className="text-grey-600">Here's what's happening with your projects today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-grey-600">Total Inquiries</p>
                        <p className="text-3xl font-light text-grey-900">{stats.totalInquiries}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-grey-600">This Month</p>
                        <p className="text-3xl font-light text-grey-900">{stats.thisMonth}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-grey-600">Team Members</p>
                        <p className="text-3xl font-light text-grey-900">{teamMembers.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-grey-600">Portfolio Items</p>
                        <p className="text-3xl font-light text-grey-900">{portfolioProjects.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-grey-200">
                  <div className="px-6 py-4 border-b border-grey-200">
                    <h3 className="text-lg font-medium text-grey-900">Recent Inquiries</h3>
                  </div>
                  <div className="p-6">
                    {filteredInquiries.slice(0, 5).length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-grey-400 mx-auto mb-4" />
                        <p className="text-grey-500">No inquiries yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredInquiries.slice(0, 5).map((inquiry) => (
                          <div key={inquiry.id} className="flex items-center justify-between p-4 hover:bg-grey-50 rounded-lg transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-grey-900">{inquiry.name}</h4>
                                <p className="text-sm text-grey-600">{inquiry.service}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-grey-500">
                                {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                              </p>
                              <p className="text-xs text-grey-400">{inquiry.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                {/* Filters and Search */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-grey-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-grey-400" />
                        <input
                          type="text"
                          placeholder="Search inquiries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Services</option>
                        {uniqueServices.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Inquiries Table */}
                <div className="bg-white rounded-lg shadow-sm border border-grey-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-grey-200">
                    <h3 className="text-lg font-medium text-grey-900">All Inquiries ({filteredInquiries.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    {filteredInquiries.length === 0 ? (
                      <div className="p-8 text-center text-grey-500">
                        No inquiries found matching your criteria.
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-grey-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Budget</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Timeline</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-grey-200">
                          {filteredInquiries.map((inquiry) => (
                            <tr key={inquiry.id} className="hover:bg-grey-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-grey-900">{inquiry.name}</div>
                                  <div className="text-sm text-grey-500">{inquiry.email}</div>
                                  {inquiry.company && <div className="text-sm text-grey-500">{inquiry.company}</div>}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  {inquiry.service}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-900">
                                {inquiry.budget || 'Not specified'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-900">
                                {inquiry.timeline || 'Not specified'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-500">
                                {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                                <button className="text-green-600 hover:text-green-900">Contact</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                {showTeamForm && (
                  <TeamMemberForm
                    member={editingTeamMember}
                    teamFormData={teamFormData}
                    setTeamFormData={setTeamFormData}
                    teamFormErrors={teamFormErrors}
                    selectedImageFiles={selectedImageFiles}
                    setSelectedImageFiles={setSelectedImageFiles}
                    editingTeamMember={editingTeamMember}
                    teamMembers={teamMembers}
                    onSave={handleSaveTeamMember}
                    onCancel={() => {
                      setShowTeamForm(false);
                      setEditingTeamMember(null);
                      setTeamFormData({
                        name: '',
                        title: '', 
                        image: '',
                        bio: '',
                        skills: '',
                        social: {
                          linkedin: '',
                          twitter: '',
                          github: '',
                        }
                      });
                      setTeamFormErrors({});
                      // Clear selected image files
                      setSelectedImageFiles(prev => {
                        const newSelectedImageFiles = { ...prev };
                        if (editingTeamMember) delete newSelectedImageFiles[editingTeamMember.id];
                        return newSelectedImageFiles;
                      });
                    }}
                  />
                )}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-grey-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-grey-900">Team Members Management</h3>
                    <button
                      onClick={() => setShowTeamForm(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="border border-grey-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-16 h-16 rounded-full object-cover border-2 border-grey-200 shadow-sm"
                                  onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTMyIDI4QzM1LjMxMzcgMjggMzggMjguNjg2MyAzOCAzMkwzOCAzNS4zMTM3IDI4IDM4IDI4IDM4QzI4LjY4NjMgMzggMjggMzUuMzEzNyAyOCAzMloiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTQyIDI0QzQyIDI5LjUyMjggMzcuNTIyOCAzNCAzMiAzNEMyNi40NzcyIDM0IDIyIDI5LjUyMjggMjIgMjRDMjIgMTguNDc3MiAyNi40NzcyIDE0IDMyIDE0QzM3LjUyMjggMTQgNDIgMTguNDc3MiA0MiAyNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+';
                                  }}
                                />
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-grey-900">{member.name}</h4>
                              <p className="text-sm text-grey-600">{member.title}</p> 
                              <div className="flex flex-wrap gap-1 mt-1">
                                {member.skills?.slice(0, 2).map((skill, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {skill}
                                  </span>
                                ))}
                                {member.skills && member.skills.length > 2 && (
                                  <span className="px-2 py-0.5 bg-grey-100 text-grey-600 text-xs rounded-full">
                                    +{member.skills.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="ml-auto flex space-x-2">
                              <button
                                onClick={() => handleEditTeamMember(member)}
                                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit member"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTeamMember(member.id)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete member"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {showPortfolioForm && (
                   <PortfolioProjectForm
                     project={editingPortfolioProject}
                     portfolioFormData={portfolioFormData}
                     setPortfolioFormData={setPortfolioFormData}
                     portfolioFormErrors={portfolioFormErrors}
                     selectedPortfolioImageFiles={selectedPortfolioImageFiles}
                     setSelectedPortfolioImageFiles={setSelectedPortfolioImageFiles}
                     onSave={handleSavePortfolioProject}
                     onCancel={() => {
                        setShowPortfolioForm(false);
                        setEditingPortfolioProject(null);
                        setPortfolioFormData({ title: '', category: '', description: '', images: '', tech: '', liveUrl: '', githubUrl: '', featured: false });
                        setPortfolioFormErrors({});
                        setSelectedPortfolioImageFiles([]);
                      }}
                   />
                )}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-grey-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-grey-900">Portfolio Projects Management</h3>
                    <button
                      onClick={() => setShowPortfolioForm(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-grey-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Category</th>
<th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Images</th>
<th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Tech Stack</th>
<th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">Project features</th>

                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-grey-200">
                        {portfolioProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-grey-50">
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-500">{project.category}</td>
<td className="px-4 py-6  whitespace-nowrap text-sm text-grey-500">
  <div className="flex space-x-1">
   <img src={project.images[0]} alt={project.title} className="w-20 h-20 object-cover rounded-md" />
   {project.images.length > 1 && (
     <span className="text-xs text-grey-400 self-center">+{project.images.length - 1}</span>
   )}
  </div>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-grey-500">{project.tech.join(', ')}</td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${project.featured ? 'bg-green-100 text-green-800' : 'bg-grey-100 text-grey-800'}`}>
                                {project.featured ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditPortfolioProject(project)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                                title="Edit"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePortfolioProject(project.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-grey-200">
                  <h3 className="text-lg font-medium text-grey-900 mb-4">Service Distribution</h3>
                  <div className="space-y-4">
                    {uniqueServices.map(service => {
                      const count = inquiries.filter(i => i.service === service).length;
                      const percentage = (count / inquiries.length) * 100;
                      return (
                        <div key={service} className="flex items-center">
                          <div className="w-32 text-sm text-grey-600">{service}</div>
                          <div className="flex-1 mx-4">
                            <div className="w-full bg-grey-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-grey-600">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-grey-200">
                <h3 className="text-lg font-medium text-grey-900 mb-4">Settings</h3>
                <p className="text-grey-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;