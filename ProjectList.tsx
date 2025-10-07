import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Calendar, MapPin, Users, TrendingUp, CreditCard as Edit, Trash2, Eye } from 'lucide-react';
import { Project } from '../../types/project';

const ProjectList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'İstanbul Konut Projesi',
      description: 'Bahçelievler bölgesinde 200 daireli konut kompleksi inşaatı',
      location: 'İstanbul, Bahçelievler',
      startDate: '2024-01-15',
      endDate: '2024-12-30',
      status: 'active',
      disciplines: [],
      progress: 65,
      createdBy: '1',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Ankara AVM İnşaatı',
      description: 'Modern alışveriş merkezi ve ofis kompleksi',
      location: 'Ankara, Çankaya',
      startDate: '2024-02-01',
      endDate: '2024-11-15',
      status: 'active',
      disciplines: [],
      progress: 42,
      createdBy: '1',
      createdAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '3',
      name: 'İzmir Ofis Binası',
      description: '15 katlı modern ofis binası inşaatı',
      location: 'İzmir, Konak',
      startDate: '2024-03-01',
      endDate: '2025-01-30',
      status: 'planning',
      disciplines: [],
      progress: 15,
      createdBy: '1',
      createdAt: '2024-02-01T00:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'planning':
        return 'Planlama';
      case 'completed':
        return 'Tamamlandı';
      case 'paused':
        return 'Duraklatıldı';
      default:
        return 'Bilinmiyor';
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Proje Yönetimi</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Proje
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="planning">Planlama</option>
            <option value="active">Aktif</option>
            <option value="paused">Duraklatıldı</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                </div>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString('tr-TR')} - 
                    {new Date(project.endDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" />
                  Görüntüle
                </button>
                <button className="flex-1 bg-orange-50 text-orange-700 py-2 px-3 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Düzenle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Proje bulunamadı</h3>
          <p className="text-gray-600 mb-4">Arama kriterlerinize uygun proje bulunmuyor.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Create Project Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Yeni Proje Oluştur</h2>
            <p className="text-gray-600 mb-4">Proje oluşturma formu burada olacak.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
              <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;