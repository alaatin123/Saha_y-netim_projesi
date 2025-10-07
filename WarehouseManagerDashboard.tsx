import React, { useState } from 'react';
import { 
  Package, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Search,
  Plus,
  Filter,
  Download,
  Truck
} from 'lucide-react';

const WarehouseManagerDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = [
    {
      title: 'Toplam Ürün',
      value: '1,247',
      change: '+23',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Kritik Stok',
      value: '18',
      change: '+5',
      changeType: 'warning',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Bekleyen Talepler',
      value: '12',
      change: '-3',
      changeType: 'decrease',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      title: 'Bu Ay Transfer',
      value: '₺145K',
      change: '+8%',
      icon: Truck,
      color: 'bg-green-500'
    }
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Çimento Portland',
      code: 'CIM-001',
      category: 'Bağlayıcı',
      currentStock: 150,
      minimumStock: 200,
      unit: 'Çuval',
      unitPrice: 45.50,
      status: 'low_stock',
      location: 'Depo A-1'
    },
    {
      id: 2,
      name: 'Demir Çubuk 16mm',
      code: 'DMR-016',
      category: 'Demir',
      currentStock: 500,
      minimumStock: 100,
      unit: 'Adet',
      unitPrice: 25.75,
      status: 'available',
      location: 'Depo B-2'
    },
    {
      id: 3,
      name: 'Tuğla Kırmızı',
      code: 'TUG-001',
      category: 'Yapı Malzemesi',
      currentStock: 0,
      minimumStock: 1000,
      unit: 'Adet',
      unitPrice: 1.25,
      status: 'out_of_stock',
      location: 'Depo C-1'
    },
    {
      id: 4,
      name: 'Kum İnşaat',
      code: 'KUM-001',
      category: 'Agrega',
      currentStock: 25,
      minimumStock: 50,
      unit: 'm³',
      unitPrice: 85.00,
      status: 'low_stock',
      location: 'Açık Alan 1'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      requester: 'Ali Çelik - Beton Ekibi',
      items: 'Çimento 50 çuval, Kum 5m³',
      priority: 'high',
      date: '2024-01-15',
      project: 'İstanbul Konut Projesi'
    },
    {
      id: 2,
      requester: 'Mehmet Öz - Demir Ekibi',
      items: 'Demir çubuk 16mm - 100 adet',
      priority: 'medium',
      date: '2024-01-15',
      project: 'Ankara AVM İnşaatı'
    },
    {
      id: 3,
      requester: 'Ahmet Kaya - İnşaat Ekibi',
      items: 'Tuğla 2000 adet, Harç 20 çuval',
      priority: 'normal',
      date: '2024-01-14',
      project: 'İzmir Ofis Binası'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Stokta';
      case 'low_stock':
        return 'Az Stok';
      case 'out_of_stock':
        return 'Stok Yok';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Depo Yönetimi</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Rapor Al
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ürün
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
                    stat.changeType === 'warning' ? 'text-red-600' :
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-green-600'
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Management */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Envanter Yönetimi</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="available">Stokta</option>
                <option value="low_stock">Az Stok</option>
                <option value="out_of_stock">Stok Yok</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Ürün</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Kod</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Stok</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Birim Fiyat</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Durum</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category} • {item.location}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-600">{item.code}</td>
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium text-gray-900">{item.currentStock} {item.unit}</p>
                        <p className="text-xs text-gray-500">Min: {item.minimumStock}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-600">₺{item.unitPrice}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-1">
                        <button className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          Düzenle
                        </button>
                        <button className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded hover:bg-green-200 transition-colors">
                          Stok Ekle
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Bekleyen Talepler</h2>
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
              {pendingRequests.length}
            </span>
          </div>

          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{request.requester}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.priority === 'high' ? 'bg-red-100 text-red-800' :
                    request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.priority === 'high' ? 'Acil' : 
                     request.priority === 'medium' ? 'Orta' : 'Normal'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">{request.items}</p>
                
                <div className="text-xs text-gray-500 mb-3">
                  <p>Proje: {request.project}</p>
                  <p>Tarih: {new Date(request.date).toLocaleDateString('tr-TR')}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded hover:bg-green-700 transition-colors font-medium">
                    Onayla
                  </button>
                  <button className="flex-1 bg-red-600 text-white text-xs py-2 px-3 rounded hover:bg-red-700 transition-colors font-medium">
                    Reddet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Stock Alerts */}
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
          <h2 className="text-lg font-semibold text-red-900">Kritik Stok Uyarıları</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventoryItems.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Mevcut: {item.currentStock} {item.unit} / Minimum: {item.minimumStock} {item.unit}
              </p>
              <button className="w-full bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                Acil Sipariş Ver
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WarehouseManagerDashboard;