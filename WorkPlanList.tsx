import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, Users, MapPin, CheckCircle, AlertTriangle, Play, Pause, CreditCard as Edit, Trash2, Eye } from 'lucide-react';

interface WorkPlan {
  id: string;
  title: string;
  description: string;
  disciplineId: string;
  disciplineName: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTeams: string[];
  tasks: Task[];
  progress: number;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
  assignedTo: string[];
  estimatedHours: number;
  actualHours?: number;
  location: string;
  materials: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
}

const WorkPlanList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockWorkPlans: WorkPlan[] = [
    {
      id: '1',
      title: 'Blok A Beton Döküm Planı',
      description: '3. ve 4. kat kolon ve kiriş beton döküm işlemleri',
      disciplineId: '1',
      disciplineName: 'Beton İşleri',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      status: 'active',
      priority: 'high',
      assignedTeams: ['team1', 'team2'],
      tasks: [],
      progress: 65,
      createdAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Demir Donatı Montaj Planı',
      description: '5. kat demir donatı yerleştirme ve bağlama işlemleri',
      disciplineId: '2',
      disciplineName: 'Demir İşleri',
      startDate: '2024-01-22',
      endDate: '2024-01-28',
      status: 'draft',
      priority: 'medium',
      assignedTeams: ['team3'],
      tasks: [],
      progress: 0,
      createdAt: '2024-01-18T00:00:00Z'
    },
    {
      id: '3',
      title: 'Duvar Örme İş Planı',
      description: '2. kat iç duvar örme işlemleri',
      disciplineId: '3',
      disciplineName: 'İnşaat İşleri',
      startDate: '2024-01-16',
      endDate: '2024-01-21',
      status: 'completed',
      priority: 'normal',
      assignedTeams: ['team4'],
      tasks: [],
      progress: 100,
      createdAt: '2024-01-10T00:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
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
      case 'draft':
        return 'Taslak';
      case 'completed':
        return 'Tamamlandı';
      case 'paused':
        return 'Duraklatıldı';
      default:
        return 'Bilinmiyor';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredWorkPlans = mockWorkPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.disciplineName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">İş Planları</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni İş Planı
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="İş planı ara..."
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
            <option value="draft">Taslak</option>
            <option value="active">Aktif</option>
            <option value="paused">Duraklatıldı</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Work Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWorkPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getPriorityColor(plan.priority)}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plan.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(plan.startDate).toLocaleDateString('tr-TR')} - 
                    {new Date(plan.endDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{plan.disciplineName} • {plan.assignedTeams.length} ekip</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {getStatusText(plan.status)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{plan.progress}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" />
                  Detay
                </button>
                
                {plan.status === 'draft' && (
                  <button className="flex-1 bg-green-50 text-green-700 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center">
                    <Play className="w-4 h-4 mr-1" />
                    Başlat
                  </button>
                )}
                
                {plan.status === 'active' && (
                  <button className="flex-1 bg-yellow-50 text-yellow-700 py-2 px-3 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium flex items-center justify-center">
                    <Pause className="w-4 h-4 mr-1" />
                    Duraklat
                  </button>
                )}
                
                <button className="bg-orange-50 text-orange-700 py-2 px-3 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkPlans.length === 0 && (
        <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">İş planı bulunamadı</h3>
          <p className="text-gray-600 mb-4">Arama kriterlerinize uygun iş planı bulunmuyor.</p>
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

      {/* Create Work Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Yeni İş Planı Oluştur</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Başlığı</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="İş planı başlığını girin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="İş planı açıklamasını girin"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disiplin</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Disiplin seçin</option>
                    <option value="1">Beton İşleri</option>
                    <option value="2">Demir İşleri</option>
                    <option value="3">İnşaat İşleri</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Öncelik</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                    <option value="critical">Kritik</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlangıç Tarihi</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bitiş Tarihi</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
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

export default WorkPlanList;