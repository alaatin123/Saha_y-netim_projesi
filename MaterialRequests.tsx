import React, { useState } from 'react';
import { Package, Plus, Search, Clock, CheckCircle, XCircle, AlertCircle, FileText, X } from 'lucide-react';

interface MaterialRequest {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  category: string;
  requestedBy: string;
  requestedByRole: string;
  teamName: string;
  projectName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected' | 'delivered';
  requestDate: string;
  requiredDate: string;
  notes?: string;
  reason: string;
}

const MaterialRequests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | null>(null);

  const requests: MaterialRequest[] = [
    {
      id: '1',
      materialName: 'Çimento Portland',
      quantity: 50,
      unit: 'Ton',
      category: 'İnşaat Malzemeleri',
      requestedBy: 'Mehmet Kaya',
      requestedByRole: 'Disiplin Şefi',
      teamName: 'İnşaat Ekibi A',
      projectName: 'İstanbul Konut Projesi',
      priority: 'high',
      status: 'pending',
      requestDate: '2024-03-15T09:00:00',
      requiredDate: '2024-03-18',
      reason: 'Beton dökümü için acil ihtiyaç',
      notes: 'Kalite sertifikası gerekli'
    },
    {
      id: '2',
      materialName: 'Elektrik Kablosu 2.5mm',
      quantity: 500,
      unit: 'Metre',
      category: 'Elektrik',
      requestedBy: 'Can Öztürk',
      requestedByRole: 'Ekip Lideri',
      teamName: 'Elektrik Ekibi 1',
      projectName: 'Ankara AVM İnşaatı',
      priority: 'medium',
      status: 'approved',
      requestDate: '2024-03-14T14:30:00',
      requiredDate: '2024-03-20',
      reason: 'Elektrik tesisatı çalışmaları'
    },
    {
      id: '3',
      materialName: 'PVC Boru 110mm',
      quantity: 200,
      unit: 'Metre',
      category: 'Sıhhi Tesisat',
      requestedBy: 'Veli Yurt',
      requestedByRole: 'Ekip Lideri',
      teamName: 'Mekanik Ekibi B',
      projectName: 'İzmir Ofis Binası',
      priority: 'urgent',
      status: 'pending',
      requestDate: '2024-03-15T11:00:00',
      requiredDate: '2024-03-16',
      reason: 'Kanalizasyon hattı tamamlanacak',
      notes: 'Yarın sabah başlayacağız, acil'
    },
    {
      id: '4',
      materialName: 'Demir Çubuk 12mm',
      quantity: 10,
      unit: 'Ton',
      category: 'İnşaat Malzemeleri',
      requestedBy: 'Ahmet Yılmaz',
      requestedByRole: 'Ekip Lideri',
      teamName: 'İnşaat Ekibi A',
      projectName: 'İstanbul Konut Projesi',
      priority: 'medium',
      status: 'delivered',
      requestDate: '2024-03-10T10:00:00',
      requiredDate: '2024-03-13',
      reason: 'Temel demiri'
    },
    {
      id: '5',
      materialName: 'Seramik Karo',
      quantity: 150,
      unit: 'M²',
      category: 'Kaplama',
      requestedBy: 'Zeynep Şahin',
      requestedByRole: 'Ekip Lideri',
      teamName: 'İnşaat Ekibi B',
      projectName: 'Ankara AVM İnşaatı',
      priority: 'low',
      status: 'rejected',
      requestDate: '2024-03-12T15:00:00',
      requiredDate: '2024-03-25',
      reason: 'Banyo ve mutfak kaplaması',
      notes: 'Stok yetersiz, alternatif önerildi'
    }
  ];

  const statuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'pending', label: 'Beklemede' },
    { value: 'approved', label: 'Onaylandı' },
    { value: 'rejected', label: 'Reddedildi' },
    { value: 'delivered', label: 'Teslim Edildi' }
  ];

  const priorities = [
    { value: 'all', label: 'Tümü' },
    { value: 'low', label: 'Düşük' },
    { value: 'medium', label: 'Orta' },
    { value: 'high', label: 'Yüksek' },
    { value: 'urgent', label: 'Acil' }
  ];

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    delivered: requests.filter(r => r.status === 'delivered').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      case 'delivered':
        return 'Teslim Edildi';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'Acil';
      case 'high':
        return 'Yüksek';
      case 'medium':
        return 'Orta';
      case 'low':
        return 'Düşük';
      default:
        return priority;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const RequestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Yeni Malzeme Talebi</h2>
          <button
            onClick={() => setShowRequestModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Malzeme Adı
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Örn: Çimento Portland"
              />
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
                Öncelik
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
                <option value="urgent">Acil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İhtiyaç Tarihi
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proje
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>İstanbul Konut Projesi</option>
                <option>Ankara AVM İnşaatı</option>
                <option>İzmir Ofis Binası</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Talep Nedeni
              </label>
              <textarea
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Malzeme kullanım amacını açıklayın..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ek Notlar
              </label>
              <textarea
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Özel istekler veya ek bilgiler..."
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={() => setShowRequestModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Talep Oluştur
          </button>
        </div>
      </div>
    </div>
  );

  const RequestDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Talep Detayı</h2>
          <button
            onClick={() => setSelectedRequest(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedRequest && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedRequest.materialName}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedRequest.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${getPriorityColor(selectedRequest.priority)}`}></span>
                <span className="text-sm font-medium text-gray-900">{getPriorityLabel(selectedRequest.priority)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Miktar</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedRequest.quantity} {selectedRequest.unit}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Durum</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                  {getStatusLabel(selectedRequest.status)}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Talep Bilgileri</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Talep Eden:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedRequest.requestedBy} ({selectedRequest.requestedByRole})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ekip:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedRequest.teamName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Proje:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedRequest.projectName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Talep Tarihi:</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(selectedRequest.requestDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">İhtiyaç Tarihi:</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(selectedRequest.requiredDate)}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Talep Nedeni</h4>
              <p className="text-sm text-gray-600">{selectedRequest.reason}</p>
            </div>

            {selectedRequest.notes && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Ek Notlar</h4>
                <p className="text-sm text-gray-600">{selectedRequest.notes}</p>
              </div>
            )}

            {selectedRequest.status === 'pending' && (
              <div className="border-t pt-4 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Onayla
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Reddet
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Malzeme Talepleri</h1>
          <p className="text-gray-600 mt-1">Malzeme taleplerini görüntüleyin ve yönetin</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Talep
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Beklemede</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Onaylandı</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reddedildi</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.rejected}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Teslim Edildi</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{stats.delivered}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
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
              placeholder="Malzeme, kişi veya proje ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
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

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => setSelectedRequest(request)}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{request.materialName}</h4>
                    <span className={`w-2 h-2 rounded-full ${getPriorityColor(request.priority)}`}></span>
                  </div>
                  <p className="text-sm text-gray-600">{request.quantity} {request.unit} - {request.category}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{request.requestedBy}</span>
                    <span>•</span>
                    <span>{request.projectName}</span>
                    <span>•</span>
                    <span>İhtiyaç: {formatDate(request.requiredDate)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {getStatusLabel(request.status)}
                </span>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Talep bulunamadı</p>
          </div>
        )}
      </div>

      {showRequestModal && <RequestModal />}
      {selectedRequest && <RequestDetailModal />}
    </div>
  );
};

export default MaterialRequests;
