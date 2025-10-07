import React, { useState } from 'react';
import { Package, Plus, Search, Filter, TrendingUp, TrendingDown, AlertCircle, CreditCard as Edit, Trash2, X } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  location: string;
  lastUpdated: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const InventoryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Çimento Portland',
      category: 'İnşaat Malzemeleri',
      quantity: 450,
      unit: 'Ton',
      minStock: 100,
      location: 'Depo A',
      lastUpdated: '2024-03-15',
      status: 'in_stock'
    },
    {
      id: '2',
      name: 'Demir Çubuk 12mm',
      category: 'İnşaat Malzemeleri',
      quantity: 75,
      unit: 'Ton',
      minStock: 80,
      location: 'Depo B',
      lastUpdated: '2024-03-14',
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'Elektrik Kablosu 2.5mm',
      category: 'Elektrik',
      quantity: 2500,
      unit: 'Metre',
      minStock: 1000,
      location: 'Depo C',
      lastUpdated: '2024-03-15',
      status: 'in_stock'
    },
    {
      id: '4',
      name: 'PVC Boru 110mm',
      category: 'Sıhhi Tesisat',
      quantity: 0,
      unit: 'Metre',
      minStock: 500,
      location: 'Depo A',
      lastUpdated: '2024-03-13',
      status: 'out_of_stock'
    },
    {
      id: '5',
      name: 'Seramik Karo',
      category: 'Kaplama',
      quantity: 850,
      unit: 'M²',
      minStock: 200,
      location: 'Depo D',
      lastUpdated: '2024-03-15',
      status: 'in_stock'
    }
  ];

  const categories = ['Tümü', 'İnşaat Malzemeleri', 'Elektrik', 'Sıhhi Tesisat', 'Kaplama'];
  const statuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'in_stock', label: 'Stokta' },
    { value: 'low_stock', label: 'Azalan Stok' },
    { value: 'out_of_stock', label: 'Tükendi' }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    totalItems: inventoryItems.length,
    lowStock: inventoryItems.filter(i => i.status === 'low_stock').length,
    outOfStock: inventoryItems.filter(i => i.status === 'out_of_stock').length,
    totalValue: 1250000
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'Stokta';
      case 'low_stock':
        return 'Azalan';
      case 'out_of_stock':
        return 'Tükendi';
      default:
        return status;
    }
  };

  const AddItemModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Yeni Malzeme Ekle</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Malzeme Adı
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Örn: Çimento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>İnşaat Malzemeleri</option>
                <option>Elektrik</option>
                <option>Sıhhi Tesisat</option>
                <option>Kaplama</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Miktar
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birim
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Ton</option>
                <option>Metre</option>
                <option>M²</option>
                <option>M³</option>
                <option>Adet</option>
                <option>Kg</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Stok
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Depo Konumu
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Örn: Depo A"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notlar
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ek bilgiler..."
            />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Malzeme Ekle
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Envanter Yönetimi</h1>
          <p className="text-gray-600 mt-1">Depo malzemelerini takip edin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Malzeme Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalItems}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Azalan Stok</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.lowStock}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tükenen</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.outOfStock}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Değer</p>
              <p className="text-2xl font-bold text-green-600 mt-2">₺{stats.totalValue.toLocaleString('tr-TR')}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Malzeme ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category === 'Tümü' ? 'all' : category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterCategory === (category === 'Tümü' ? 'all' : category)
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Malzeme</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Kategori</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Miktar</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Min. Stok</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Konum</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Durum</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Güncelleme</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.category}</td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{item.quantity} {item.unit}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.minStock} {item.unit}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.location}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(item.lastUpdated).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Malzeme bulunamadı</p>
          </div>
        )}
      </div>

      {showAddModal && <AddItemModal />}
    </div>
  );
};

export default InventoryManagement;
