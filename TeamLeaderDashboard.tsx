import React, { useState } from 'react';
import { 
  Users, 
  Play, 
  Square, 
  Camera, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  MessageSquare,
  Calendar
} from 'lucide-react';

const TeamLeaderDashboard: React.FC = () => {
  const [activeTask, setActiveTask] = useState<any>(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Zeynep Şahin',
      status: 'active',
      currentTask: 'Beton döküm hazırlığı',
      location: 'Blok A - 2. Kat',
      checkInTime: '08:30'
    },
    {
      id: 2,
      name: 'Mustafa Demir',
      status: 'active',
      currentTask: 'Demir bağlama işlemi',
      location: 'Blok A - 3. Kat',
      checkInTime: '08:15'
    },
    {
      id: 3,
      name: 'Ayşe Kaya',
      status: 'break',
      currentTask: 'Mola',
      location: 'Dinlenme Alanı',
      checkInTime: '08:45'
    },
    {
      id: 4,
      name: 'Mehmet Yılmaz',
      status: 'active',
      currentTask: 'Malzeme taşıma',
      location: 'Depo - Blok A arası',
      checkInTime: '08:00'
    }
  ];

  const availableTasks = [
    {
      id: 1,
      title: 'Beton döküm işlemi',
      description: 'Blok A 4. kat kolon ve kiriş beton dökümü',
      priority: 'high',
      estimatedTime: '4 saat',
      requiredWorkers: 3,
      location: 'Blok A - 4. Kat',
      materials: ['Beton', 'Vibratör', 'Güvenlik ekipmanları']
    },
    {
      id: 2,
      title: 'Demir montaj kontrolü',
      description: '5. kat demir donatı kontrolü ve eksiklerin tamamlanması',
      priority: 'medium',
      estimatedTime: '2 saat',
      requiredWorkers: 2,
      location: 'Blok A - 5. Kat',
      materials: ['Demir çubuk', 'Tel', 'Pense']
    },
    {
      id: 3,
      title: 'Güvenlik kontrol turu',
      description: 'Şantiye geneli güvenlik kontrol turu ve rapor hazırlama',
      priority: 'normal',
      estimatedTime: '1 saat',
      requiredWorkers: 1,
      location: 'Şantiye Geneli',
      materials: ['Kontrol listesi', 'Tablet']
    }
  ];

  const allocatedMaterials = [
    {
      id: 1,
      name: 'Beton C25',
      quantity: '15 m³',
      allocatedDate: '2024-01-15',
      status: 'allocated',
      usedQuantity: '8 m³'
    },
    {
      id: 2,
      name: 'Demir Çubuk 16mm',
      quantity: '200 adet',
      allocatedDate: '2024-01-14',
      status: 'allocated',
      usedQuantity: '150 adet'
    },
    {
      id: 3,
      name: 'Güvenlik Bariyeri',
      quantity: '20 adet',
      allocatedDate: '2024-01-13',
      status: 'returned',
      usedQuantity: '20 adet'
    }
  ];

  const handleStartTask = (task: any) => {
    setActiveTask(task);
  };

  const handleCompleteTask = () => {
    setActiveTask(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'break':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'break':
        return 'Molada';
      case 'offline':
        return 'Çevrimdışı';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Ekip Başı Paneli</h1>
        <div className="text-xs md:text-sm text-gray-600">
          {new Date().toLocaleDateString('tr-TR')} - {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Active Task Status */}
      {activeTask ? (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Play className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-blue-900">Aktif Görev</h2>
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
              Devam Ediyor
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">{activeTask.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{activeTask.description}</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{activeTask.location}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tahmini Süre:</span>
                <span className="font-medium">{activeTask.estimatedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gerekli İşçi:</span>
                <span className="font-medium">{activeTask.requiredWorkers} kişi</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Başlama:</span>
                <span className="font-medium">09:30</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCompleteTask}
              className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Görevi Tamamla
            </button>
            <button className="flex items-center justify-center bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium">
              <Camera className="w-5 h-5 mr-2" />
              Fotoğraf Ekle
            </button>
            <button className="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
              <Square className="w-5 h-5 mr-2" />
              Görevi Durdur
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Aktif Görev Yok</h2>
          <p className="text-gray-600">Aşağıdaki listeden yeni bir görev başlatabilirsiniz.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Ekip Üyeleri</h2>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{teamMembers.length} kişi</span>
            </div>
          </div>

          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {getStatusText(member.status)}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Görev: {member.currentTask}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{member.checkInTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Mevcut Görevler</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {availableTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <span className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <div>Süre: {task.estimatedTime}</div>
                  <div>İşçi: {task.requiredWorkers} kişi</div>
                  <div className="col-span-2 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {task.location}
                  </div>
                </div>
                
                <button
                  onClick={() => handleStartTask(task)}
                  disabled={!!activeTask}
                  className="w-full bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Görevi Başlat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Allocation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Zimmetli Malzemeler</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
            <Package className="w-4 h-4 mr-2" />
            Yeni Zimmet
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600">Malzeme</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Zimmet Miktarı</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Kullanılan</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Tarih</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Durum</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {allocatedMaterials.map((material) => (
                <tr key={material.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">{material.name}</td>
                  <td className="py-3 px-2 text-gray-600">{material.quantity}</td>
                  <td className="py-3 px-2 text-gray-600">{material.usedQuantity}</td>
                  <td className="py-3 px-2 text-gray-600">
                    {new Date(material.allocatedDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      material.status === 'allocated' ? 'bg-blue-100 text-blue-800' :
                      material.status === 'returned' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {material.status === 'allocated' ? 'Zimmetli' :
                       material.status === 'returned' ? 'İade Edildi' : 'Bilinmiyor'}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {material.status === 'allocated' && (
                      <button className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded hover:bg-green-200 transition-colors">
                        İade Et
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-50 border border-blue-200 p-4 rounded-xl hover:bg-blue-100 transition-colors text-center">
          <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="font-medium text-blue-900">Ekip Mesajı</p>
          <p className="text-sm text-blue-600">Ekibe mesaj gönder</p>
        </button>
        
        <button className="bg-orange-50 border border-orange-200 p-4 rounded-xl hover:bg-orange-100 transition-colors text-center">
          <Camera className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="font-medium text-orange-900">İlerleme Fotoğrafı</p>
          <p className="text-sm text-orange-600">Günlük ilerleme kaydet</p>
        </button>
        
        <button className="bg-red-50 border border-red-200 p-4 rounded-xl hover:bg-red-100 transition-colors text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="font-medium text-red-900">Sorun Bildir</p>
          <p className="text-sm text-red-600">Acil durum raporu</p>
        </button>
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;