import React from 'react';
import { 
  Users, 
  Construction, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Aktif Projeler',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: Construction,
      color: 'bg-blue-500'
    },
    {
      title: 'Toplam Kullanıcı',
      value: '248',
      change: '+18',
      changeType: 'increase',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Bu Ay Tamamlanan',
      value: '3',
      change: '+1',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'bg-orange-500'
    },
    {
      title: 'Toplam Bütçe',
      value: '₺2.4M',
      change: '+12%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'İstanbul Konut Projesi',
      progress: 85,
      status: 'Aktif',
      team: 45,
      deadline: '2024-06-15'
    },
    {
      id: 2,
      name: 'Ankara AVM İnşaatı',
      progress: 62,
      status: 'Aktif',
      team: 32,
      deadline: '2024-08-20'
    },
    {
      id: 3,
      name: 'İzmir Ofis Binası',
      progress: 38,
      status: 'Aktif',
      team: 28,
      deadline: '2024-09-30'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'İstanbul projesinde malzeme eksikliği',
      time: '2 saat önce'
    },
    {
      id: 2,
      type: 'info',
      message: 'Yeni sınıf şefi ataması yapıldı',
      time: '4 saat önce'
    },
    {
      id: 3,
      type: 'error',
      message: 'Ankara projesinde güvenlik ihlali raporu',
      time: '6 saat önce'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
        <div className="text-sm text-gray-600">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')} {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">bu ay</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Aktif Projeler</h2>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Tümünü Gör
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{project.team} kişi</span>
                  <span>Son tarih: {new Date(project.deadline).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">İlerleme</span>
                  <span className="text-xs text-gray-900 font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Son Uyarılar</h2>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Tümünü Gör
            </button>
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'error' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Proje Performansı</h2>
          <div className="flex space-x-2">
            <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded-md text-sm font-medium">
              Bu Ay
            </button>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md text-sm">
              3 Ay
            </button>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md text-sm">
              6 Ay
            </button>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Performans grafiği burada gösterilecek</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;