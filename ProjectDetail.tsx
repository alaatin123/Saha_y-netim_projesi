import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Settings, Plus, CreditCard as Edit, Trash2, UserPlus } from 'lucide-react';
import { Project, Discipline } from '../../types/project';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data
  const project: Project = {
    id: projectId,
    name: 'İstanbul Konut Projesi',
    description: 'Bahçelievler bölgesinde 200 daireli konut kompleksi inşaatı. Modern mimari tasarım ile çevre dostu malzemeler kullanılarak inşa edilmektedir.',
    location: 'İstanbul, Bahçelievler',
    startDate: '2024-01-15',
    endDate: '2024-12-30',
    status: 'active',
    disciplines: [
      {
        id: '1',
        name: 'Beton İşleri',
        projectId: projectId,
        chiefId: '2',
        teams: [],
        progress: 75,
        color: '#3B82F6'
      },
      {
        id: '2',
        name: 'Demir İşleri',
        projectId: projectId,
        chiefId: '2',
        teams: [],
        progress: 60,
        color: '#EF4444'
      },
      {
        id: '3',
        name: 'İnşaat İşleri',
        projectId: projectId,
        teams: [],
        progress: 45,
        color: '#10B981'
      }
    ],
    progress: 65,
    createdBy: '1',
    createdAt: '2024-01-01T00:00:00Z'
  };

  const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'disciplines', label: 'Disiplinler' },
    { id: 'team', label: 'Ekip' },
    { id: 'timeline', label: 'Zaman Çizelgesi' },
    { id: 'settings', label: 'Ayarlar' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Genel İlerleme</p>
              <p className="text-2xl font-bold text-blue-900 mt-2">{project.progress}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Aktif Disiplin</p>
              <p className="text-2xl font-bold text-green-900 mt-2">{project.disciplines.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Toplam Ekip</p>
              <p className="text-2xl font-bold text-orange-900 mt-2">8</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Kalan Gün</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">
                {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proje Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Proje Adı</label>
            <p className="text-gray-900">{project.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Konum</label>
            <p className="text-gray-900 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Başlangıç Tarihi</label>
            <p className="text-gray-900">{new Date(project.startDate).toLocaleDateString('tr-TR')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Bitiş Tarihi</label>
            <p className="text-gray-900">{new Date(project.endDate).toLocaleDateString('tr-TR')}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Açıklama</label>
            <p className="text-gray-900">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Discipline Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Disiplin İlerlemeleri</h3>
        <div className="space-y-4">
          {project.disciplines.map((discipline) => (
            <div key={discipline.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{discipline.name}</h4>
                <span className="text-sm font-medium text-gray-600">{discipline.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${discipline.progress}%`,
                    backgroundColor: discipline.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDisciplines = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Proje Disiplinleri</h3>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Disiplin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.disciplines.map((discipline) => (
          <div key={discipline.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: discipline.color }}
              ></div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-2">{discipline.name}</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">İlerleme</span>
                <span className="font-medium">{discipline.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${discipline.progress}%`,
                    backgroundColor: discipline.color
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sınıf Şefi</span>
                <span className="font-medium">
                  {discipline.chiefId ? 'Atandı' : 'Atanmadı'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ekip Sayısı</span>
                <span className="font-medium">{discipline.teams.length}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center">
                <UserPlus className="w-4 h-4 mr-1" />
                Sınıf Şefi Ata
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'disciplines':
        return renderDisciplines();
      case 'team':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ekip Yönetimi</h3>
            <p className="text-gray-600">Bu bölüm geliştiriliyor...</p>
          </div>
        );
      case 'timeline':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Zaman Çizelgesi</h3>
            <p className="text-gray-600">Bu bölüm geliştiriliyor...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Proje Ayarları</h3>
            <p className="text-gray-600">Bu bölüm geliştiriliyor...</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Düzenle
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <Trash2 className="w-4 h-4 mr-2" />
            Sil
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default ProjectDetail;