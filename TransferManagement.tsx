import React, { useState } from 'react';
import { Truck, Plus, Search, MapPin, Clock, CheckCircle, Package, X, ArrowRight } from 'lucide-react';

interface Transfer {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  fromLocation: string;
  toLocation: string;
  fromProject: string;
  toProject: string;
  requestedBy: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  transferDate: string;
  estimatedArrival: string;
  actualArrival?: string;
  driverName?: string;
  vehiclePlate?: string;
  notes?: string;
}

const TransferManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);

  const transfers: Transfer[] = [
    {
      id: '1',
      materialName: 'Çimento Portland',
      quantity: 20,
      unit: 'Ton',
      fromLocation: 'Depo A',
      toLocation: 'Depo B',
      fromProject: 'İstanbul Konut Projesi',
      toProject: 'Ankara AVM İnşaatı',
      requestedBy: 'Mehmet Kaya',
      status: 'in_transit',
      transferDate: '2024-03-15T08:00:00',
      estimatedArrival: '2024-03-15T16:00:00',
      driverName: 'Ali Yılmaz',
      vehiclePlate: '34 ABC 123'
    },
    {
      id: '2',
      materialName: 'Demir Çubuk 12mm',
      quantity: 5,
      unit: 'Ton',
      fromLocation: 'Depo B',
      toLocation: 'Depo C',
      fromProject: 'Ankara AVM İnşaatı',
      toProject: 'İzmir Ofis Binası',
      requestedBy: 'Can Öztürk',
      status: 'pending',
      transferDate: '2024-03-16T09:00:00',
      estimatedArrival: '2024-03-16T18:00:00'
    },
    {
      id: '3',
      materialName: 'Elektrik Kablosu 2.5mm',
      quantity: 1000,
      unit: 'Metre',
      fromLocation: 'Depo A',
      toLocation: 'Depo C',
      fromProject: 'İstanbul Konut Projesi',
      toProject: 'İzmir Ofis Binası',
      requestedBy: 'Veli Yurt',
      status: 'delivered',
      transferDate: '2024-03-14T10:00:00',
      estimatedArrival: '2024-03-14T17:00:00',
      actualArrival: '2024-03-14T16:30:00',
      driverName: 'Mehmet Demir',
      vehiclePlate: '06 XYZ 456'
    },
    {
      id: '4',
      materialName: 'PVC Boru 110mm',
      quantity: 300,
      unit: 'Metre',
      fromLocation: 'Depo D',
      toLocation: 'Depo A',
      fromProject: 'Ana Depo',
      toProject: 'İstanbul Konut Projesi',
      requestedBy: 'Ahmet Yılmaz',
      status: 'delivered',
      transferDate: '2024-03-13T08:00:00',
      estimatedArrival: '2024-03-13T12:00:00',
      actualArrival: '2024-03-13T11:45:00',
      driverName: 'Hasan Kaya',
      vehiclePlate: '34 DEF 789',
      notes: 'Sorunsuz teslim edildi'
    }
  ];

  const statuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'pending', label: 'Beklemede' },
    { value: 'in_transit', label: 'Yolda' },
    { value: 'delivered', label: 'Teslim Edildi' },
    { value: 'cancelled', label: 'İptal Edildi' }
  ];

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.toLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.vehiclePlate?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transfer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: transfers.filter(t => t.status === 'pending').length,
    inTransit: transfers.filter(t => t.status === 'in_transit').length,
    delivered: transfers.filter(t => t.status === 'delivered').length,
    total: transfers.length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'in_transit':
        return 'Yolda';
      case 'delivered':
        return 'Teslim Edildi';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TransferModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Yeni Transfer</h2>
          <button
            onClick={() => setShowTransferModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Malzeme
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Çimento Portland</option>
                <option>Demir Çubuk 12mm</option>
                <option>Elektrik Kablosu 2.5mm</option>
                <option>PVC Boru 110mm</option>
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
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Çıkış Konumu
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Depo A</option>
                <option>Depo B</option>
                <option>Depo C</option>
                <option>Depo D</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Varış Konumu
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Depo A</option>
                <option>Depo B</option>
                <option>Depo C</option>
                <option>Depo D</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Çıkış Projesi
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>İstanbul Konut Projesi</option>
                <option>Ankara AVM İnşaatı</option>
                <option>İzmir Ofis Binası</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Varış Projesi
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>İstanbul Konut Projesi</option>
                <option>Ankara AVM İnşaatı</option>
                <option>İzmir Ofis Binası</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Tarihi
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tahmini Varış
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sürücü Adı
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Sürücü adı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Araç Plakası
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="34 ABC 123"
              />
            </div>

            <div className="md:col-span-2">
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
        </div>

        <div className="p-6 border-t flex justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={() => setShowTransferModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Transfer Oluştur
          </button>
        </div>
      </div>
    </div>
  );

  const TransferDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Transfer Detayı</h2>
          <button
            onClick={() => setSelectedTransfer(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedTransfer && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedTransfer.materialName}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTransfer.quantity} {selectedTransfer.unit}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransfer.status)}`}>
                {getStatusLabel(selectedTransfer.status)}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedTransfer.fromLocation}</p>
                    <p className="text-xs text-gray-600">{selectedTransfer.fromProject}</p>
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-gray-400" />

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedTransfer.toLocation}</p>
                    <p className="text-xs text-gray-600">{selectedTransfer.toProject}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Transfer Bilgileri</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Talep Eden:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedTransfer.requestedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transfer Tarihi:</span>
                  <span className="text-sm font-medium text-gray-900">{formatDateTime(selectedTransfer.transferDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tahmini Varış:</span>
                  <span className="text-sm font-medium text-gray-900">{formatDateTime(selectedTransfer.estimatedArrival)}</span>
                </div>
                {selectedTransfer.actualArrival && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gerçek Varış:</span>
                    <span className="text-sm font-medium text-green-600">{formatDateTime(selectedTransfer.actualArrival)}</span>
                  </div>
                )}
              </div>
            </div>

            {(selectedTransfer.driverName || selectedTransfer.vehiclePlate) && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Taşıma Bilgileri</h4>
                <div className="space-y-3">
                  {selectedTransfer.driverName && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sürücü:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedTransfer.driverName}</span>
                    </div>
                  )}
                  {selectedTransfer.vehiclePlate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Araç Plakası:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedTransfer.vehiclePlate}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedTransfer.notes && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Notlar</h4>
                <p className="text-sm text-gray-600">{selectedTransfer.notes}</p>
              </div>
            )}

            {selectedTransfer.status === 'in_transit' && (
              <div className="border-t pt-4">
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Teslimatı Onayla
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
          <h1 className="text-2xl font-bold text-gray-900">Transfer Yönetimi</h1>
          <p className="text-gray-600 mt-1">Malzeme transferlerini takip edin</p>
        </div>
        <button
          onClick={() => setShowTransferModal(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Transfer
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
              <p className="text-sm font-medium text-gray-600">Yolda</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{stats.inTransit}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Teslim Edildi</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.delivered}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-gray-600" />
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
              placeholder="Malzeme, konum veya plaka ara..."
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
        </div>

        <div className="space-y-3">
          {filteredTransfers.map((transfer) => (
            <div
              key={transfer.id}
              onClick={() => setSelectedTransfer(transfer)}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900">{transfer.materialName}</h4>
                  <p className="text-sm text-gray-600">{transfer.quantity} {transfer.unit}</p>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <span>{transfer.fromLocation}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>{transfer.toLocation}</span>
                    {transfer.vehiclePlate && (
                      <>
                        <span>•</span>
                        <span>{transfer.vehiclePlate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                  {getStatusLabel(transfer.status)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTransfers.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Transfer bulunamadı</p>
          </div>
        )}
      </div>

      {showTransferModal && <TransferModal />}
      {selectedTransfer && <TransferDetailModal />}
    </div>
  );
};

export default TransferManagement;
