import React from 'react';
import { 
  Users, 
  ClipboardList, 
  Package, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare
} from 'lucide-react';

const DisciplineChiefDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Aktif Ekipler',
      value: '6',
      change: '+1',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Bekleyen Görevler',
      value: '12',
      change: '-3',
      changeType: 'decrease',
      icon: ClipboardList,
      color: 'bg-orange-500'
    },
    {
      title: 'Malzeme Talepleri',
      value: '4',
      change: '+2',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Onay Bekleyen',
      value: '8',
      change: '+5',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ];

  const teams = [
    {
      id: 1,
      name: 'Beton Ekibi',
      leader: 'Ali Çelik',
      members: 8,
      currentTask: 'Blok A döküm işlemi',
      progress: 75,
      status: 'active'
    },
    {
      id: 2,
      name: 'Demir Ekibi',
      leader: 'Mehmet Öz',
      members: 6,
      currentTask: 'Kolon demirlerinin bağlanması',
      progress: 45,
      status: 'active'
    },
    {
      id: 3,
      name: 'İnşaat Ekibi',
      leader: 'Ahmet Kaya',
      members: 10,
      currentTask: 'Duvar örme işlemi',
      progress: 90,
      status: 'active'
    }
  ];

  const materialRequests = [
    {
      id: 1,
      item: 'Çimento 300 kg',
      requestedBy: 'Ali Çelik',
      urgency: 'high',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      item: 'Demir çubuk 16mm - 50 adet',
      requestedBy: 'Mehmet Öz',
      urgency: 'medium',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: 3,
      item: 'Tuğla 1000 adet',
      requestedBy: 'Ahmet Kaya',
      urgency: 'normal',
      date: '2024-01-14',
      status: 'fulfilled'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'timesheet',
      title: 'Haftalık puantaj onayı',
      count: 15,
      deadline: '2024-01-16'
    },
    {
      id: 2,
      type: 'report',
      title: 'Günlük ilerleme raporları',
      count: 3,
      deadline: '2024-01-15'
    },
    {
      id: 3,
      type: 'incident',
      title: 'Saha tutanak onayı',
      count: 2,
      deadline: '2024-01-15'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sınıf Şefi Paneli</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
            Yeni Görev
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Rapor Al
          </button>
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
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">bu hafta</span>
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
        {/* Teams Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Ekip Durumu</h2>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Ekip Yönetimi
            </button>
          </div>
          
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{team.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {team.status === 'active' ? 'Aktif' : 'Beklemede'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <p>Sorumlu: {team.leader} • {team.members} kişi</p>
                  <p className="text-xs mt-1 truncate">{team.currentTask}</p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${team.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>İlerleme</span>
                  <span>{team.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Requests */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Malzeme Talepleri</h2>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Yeni Talep
            </button>
          </div>
          
          <div className="space-y-3">
            {materialRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{request.item}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.urgency === 'high' ? 'Acil' : 
                     request.urgency === 'medium' ? 'Orta' : 'Normal'}
                  </span>
                </div>
                
                <div className="text-xs text-gray-600 mb-2">
                  <p>Talep eden: {request.requestedBy}</p>
                  <p>Tarih: {new Date(request.date).toLocaleDateString('tr-TR')}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    request.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                    request.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status === 'fulfilled' ? 'Teslim Edildi' :
                     request.status === 'approved' ? 'Onaylandı' : 'Bekliyor'}
                  </span>
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-1">
                      <button className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded hover:bg-green-200 transition-colors">
                        Onayla
                      </button>
                      <button className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded hover:bg-red-200 transition-colors">
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Onay Bekleyenler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  approval.type === 'timesheet' ? 'bg-blue-500' :
                  approval.type === 'report' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {approval.type === 'timesheet' ? <Clock className="w-5 h-5 text-white" /> :
                   approval.type === 'report' ? <ClipboardList className="w-5 h-5 text-white" /> :
                   <AlertCircle className="w-5 h-5 text-white" />}
                </div>
                
                <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  {approval.count}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-1">{approval.title}</h3>
              <p className="text-sm text-gray-600">
                Son tarih: {new Date(approval.deadline).toLocaleDateString('tr-TR')}
              </p>
              
              <button className="w-full mt-3 bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                İncele ve Onayla
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisciplineChiefDashboard;