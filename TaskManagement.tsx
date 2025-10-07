import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, Users, MapPin, CheckCircle, AlertTriangle, Play, Pause, CreditCard as Edit, Trash2, Eye, Package, Camera } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  workPlanId: string;
  workPlanTitle: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTeam: string;
  assignedMembers: string[];
  estimatedHours: number;
  actualHours?: number;
  location: string;
  materials: string[];
  startDate: string;
  endDate: string;
  progress: number;
  createdAt: string;
}

const TaskManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const mockTasks: Task[] = [
    {
      id: '1',
      title: '3. Kat Kolon Beton Dökümü',
      description: 'C25 beton ile kolon dökümü işlemi',
      workPlanId: '1',
      workPlanTitle: 'Blok A Beton Döküm Planı',
      status: 'in_progress',
      priority: 'high',
      assignedTeam: 'Beton Ekibi A',
      assignedMembers: ['Ali Çelik', 'Mehmet Öz', 'Ahmet Kaya'],
      estimatedHours: 8,
      actualHours: 5,
      location: 'Blok A - 3. Kat',
      materials: ['Beton C25', 'Vibratör', 'Güvenlik Ekipmanları'],
      startDate: '2024-01-20',
      endDate: '2024-01-20',
      progress: 65,
      createdAt: '2024-01-19T00:00:00Z'
    },
    {
      id: '2',
      title: '4. Kat Kiriş Kalıp Montajı',
      description: 'Kiriş kalıplarının montaj işlemi',
      workPlanId: '1',
      workPlanTitle: 'Blok A Beton Döküm Planı',
      status: 'pending',
      priority: 'medium',
      assignedTeam: 'Kalıp Ekibi',
      assignedMembers: ['Fatma Demir', 'Zeynep Şahin'],
      estimatedHours: 6,
      location: 'Blok A - 4. Kat',
      materials: ['Kalıp Malzemesi', 'Çivi', 'Çekiç'],
      startDate: '2024-01-21',
      endDate: '2024-01-21',
      progress: 0,
      createdAt: '2024-01-19T00:00:00Z'
    },
    {
      id: '3',
      title: '5. Kat Demir Donatı Kontrolü',
      description: 'Yerleştirilen demir donatıların kontrol edilmesi',
      workPlanId: '2',
      workPlanTitle: 'Demir Donatı Montaj Planı',
      status: 'completed',
      priority: 'high',
      assignedTeam: 'Demir Ekibi',
      assignedMembers: ['Mustafa Yılmaz'],
      estimatedHours: 4,
      actualHours: 3.5,
      location: 'Blok A - 5. Kat',
      materials: ['Kontrol Listesi', 'Ölçü Aleti'],
      startDate: '2024-01-18',
      endDate: '2024-01-18',
      progress: 100,
      createdAt: '2024-01-17T00:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'Devam Ediyor';
      case 'pending':
        return 'Bekliyor';
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

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.workPlanTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Görev Yönetimi</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Görev
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Görev ara..."
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
            <option value="pending">Bekliyor</option>
            <option value="in_progress">Devam Ediyor</option>
            <option value="paused">Duraklatıldı</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getPriorityColor(task.priority)}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <p className="text-xs text-blue-600 font-medium">{task.workPlanTitle}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedTask(task)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{task.assignedTeam}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{task.actualHours || 0}/{task.estimatedHours} saat</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(task.startDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">İlerleme</span>
                <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>

              <div className="flex flex-wrap gap-2">
                {task.status === 'pending' && (
                  <button className="bg-green-50 text-green-700 py-1 px-3 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    Başlat
                  </button>
                )}
                
                {task.status === 'in_progress' && (
                  <>
                    <button className="bg-yellow-50 text-yellow-700 py-1 px-3 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium flex items-center">
                      <Pause className="w-4 h-4 mr-1" />
                      Duraklat
                    </button>
                    <button className="bg-blue-50 text-blue-700 py-1 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Tamamla
                    </button>
                  </>
                )}
                
                <button className="bg-orange-50 text-orange-700 py-1 px-3 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium flex items-center">
                  <Camera className="w-4 h-4 mr-1" />
                  Fotoğraf
                </button>
                
                <button className="bg-purple-50 text-purple-700 py-1 px-3 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  Malzeme
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Görev Detayları</h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{selectedTask.title}</h3>
                <p className="text-gray-600">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                    {getStatusText(selectedTask.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Öncelik</label>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getPriorityColor(selectedTask.priority)}`}></div>
                    <span className="text-sm text-gray-900 capitalize">{selectedTask.priority}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Atanan Ekip</label>
                <p className="text-gray-900">{selectedTask.assignedTeam}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ekip Üyeleri</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.assignedMembers.map((member, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gerekli Malzemeler</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.materials.map((material, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahmini Süre</label>
                  <p className="text-gray-900">{selectedTask.estimatedHours} saat</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Geçen Süre</label>
                  <p className="text-gray-900">{selectedTask.actualHours || 0} saat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Yeni Görev Oluştur</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Görev Başlığı</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Görev başlığını girin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Görev açıklamasını girin"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İş Planı</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">İş planı seçin</option>
                    <option value="1">Blok A Beton Döküm Planı</option>
                    <option value="2">Demir Donatı Montaj Planı</option>
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

export default TaskManagement;