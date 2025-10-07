import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare,
  Calendar,
  User
} from 'lucide-react';

const TeamMemberDashboard: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Konum alınıyor...');

  const handleLocationCheck = () => {
    // Mock location - in real app, would use GPS
    setCurrentLocation('İstanbul Konut Projesi - Blok A');
  };

  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
    handleLocationCheck();
  };

  const todayTasks = [
    {
      id: 1,
      title: 'Beton döküm kontrol',
      location: 'Blok A - 3. Kat',
      priority: 'high',
      deadline: '14:00',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Güvenlik kontrol listesi',
      location: 'Şantiye girişi',
      priority: 'medium',
      deadline: '16:30',
      status: 'completed'
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      title: 'Malzeme eksikliği',
      date: '2024-01-15',
      status: 'resolved'
    },
    {
      id: 2,
      title: 'Ekipman arızası',
      date: '2024-01-14',
      status: 'investigating'
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Günlük Panel</h1>
        <div className="text-xs md:text-sm text-gray-600">
          {new Date().toLocaleDateString('tr-TR')}
        </div>
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Check In/Out */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Puantaj</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isCheckedIn 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {isCheckedIn ? 'İş Başında' : 'Giriş Yapılmadı'}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="truncate">{currentLocation}</span>
            </div>
            
            <button
              onClick={handleCheckIn}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isCheckedIn
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isCheckedIn ? 'Mesai Bitir' : 'Mesai Başlat'}
            </button>
            
            {isCheckedIn && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  Mesai başlama: 08:30
                </p>
                <p className="text-sm text-blue-800">
                  Geçen süre: 4 saat 15 dakika
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Report */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center mb-4">
            <Camera className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Hızlı Rapor</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center py-3 px-4 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Güvenlik İhlali Bildir
            </button>
            
            <button className="w-full flex items-center justify-center py-3 px-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <Camera className="w-5 h-5 mr-2" />
              Saha Tutanağı Oluştur
            </button>
            
            <button className="w-full flex items-center justify-center py-3 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <MessageSquare className="w-5 h-5 mr-2" />
              Mesaj Gönder
            </button>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Bugünkü Görevler</h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <span className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{task.deadline}</span>
                </div>
              </div>
              
              {task.status === 'completed' ? (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Tamamlandı
                </div>
              ) : (
                <button className="w-full md:w-auto bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                  Görevi Tamamla
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Bildirilerim</h2>
        
        <div className="space-y-3">
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{incident.title}</p>
                <p className="text-sm text-gray-600">{new Date(incident.date).toLocaleDateString('tr-TR')}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                incident.status === 'resolved' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {incident.status === 'resolved' ? 'Çözüldü' : 'İnceleniyor'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <p className="text-2xl font-bold text-blue-600">8.5</p>
          <p className="text-sm text-gray-600">Çalışma Saati</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <p className="text-2xl font-bold text-green-600">3</p>
          <p className="text-sm text-gray-600">Tamamlanan Görev</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <p className="text-2xl font-bold text-orange-600">2</p>
          <p className="text-sm text-gray-600">Aktif Görev</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <p className="text-2xl font-bold text-purple-600">1</p>
          <p className="text-sm text-gray-600">Bildirim</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;