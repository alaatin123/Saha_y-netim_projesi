import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  User,
  Navigation
} from 'lucide-react';
import { TimesheetEntry } from '../../types/timesheet';

const TimesheetManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);

  const mockEntries: TimesheetEntry[] = [
    {
      id: '1',
      userId: '5',
      projectId: '1',
      disciplineId: '1',
      date: '2024-01-20',
      checkIn: '08:30',
      checkOut: '17:15',
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'İstanbul Konut Projesi - Blok A'
      },
      status: 'approved',
      approvedBy: '2',
      totalHours: 8.75,
      notes: 'Normal mesai',
      breakDuration: 60
    },
    {
      id: '2',
      userId: '4',
      projectId: '1',
      disciplineId: '2',
      date: '2024-01-20',
      checkIn: '08:15',
      checkOut: '16:45',
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'İstanbul Konut Projesi - Blok A'
      },
      status: 'checked_out',
      totalHours: 8.5,
      notes: 'Demir montaj işlemi',
      breakDuration: 45
    },
    {
      id: '3',
      userId: '3',
      projectId: '2',
      disciplineId: '1',
      date: '2024-01-20',
      checkIn: '09:00',
      location: {
        lat: 39.9334,
        lng: 32.8597,
        address: 'Ankara AVM İnşaatı - Ana Giriş'
      },
      status: 'checked_in',
      notes: 'Beton döküm hazırlığı'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked_in':
        return 'bg-blue-100 text-blue-800';
      case 'checked_out':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'checked_in':
        return 'Giriş Yapıldı';
      case 'checked_out':
        return 'Çıkış Yapıldı';
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked_in':
        return <Clock className="w-4 h-4" />;
      case 'checked_out':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredEntries = mockEntries.filter(entry => {
    const matchesSearch = entry.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    const matchesDate = entry.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleApprove = (entryId: string) => {
    // Approval logic would go here
    console.log('Approving entry:', entryId);
  };

  const handleReject = (entryId: string) => {
    // Rejection logic would go here
    console.log('Rejecting entry:', entryId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Puantaj Yönetimi</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Rapor Al
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Konum ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="checked_in">Giriş Yapıldı</option>
              <option value="checked_out">Çıkış Yapıldı</option>
              <option value="approved">Onaylandı</option>
              <option value="rejected">Reddedildi</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center justify-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Giriş</p>
              <p className="text-2xl font-bold text-blue-900 mt-2">{filteredEntries.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Onay Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-900 mt-2">
                {filteredEntries.filter(e => e.status === 'checked_out').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Onaylanan</p>
              <p className="text-2xl font-bold text-green-900 mt-2">
                {filteredEntries.filter(e => e.status === 'approved').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Saat</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">
                {filteredEntries.reduce((total, entry) => total + (entry.totalHours || 0), 0).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Timesheet Entries */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Puantaj Kayıtları - {new Date(selectedDate).toLocaleDateString('tr-TR')}
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Çalışan</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Konum</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Giriş</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Çıkış</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Toplam Saat</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Durum</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Çalışan #{entry.userId}</p>
                        <p className="text-sm text-gray-500">Disiplin #{entry.disciplineId}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{entry.location.address}</p>
                        <p className="text-xs text-gray-500">
                          {entry.location.lat.toFixed(4)}, {entry.location.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{entry.checkIn}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    {entry.checkOut ? (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{entry.checkOut}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-900">
                      {entry.totalHours ? `${entry.totalHours} saat` : '-'}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                        {getStatusIcon(entry.status)}
                        <span className="ml-1">{getStatusText(entry.status)}</span>
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {entry.status === 'checked_out' && (
                        <>
                          <button
                            onClick={() => handleApprove(entry.id)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleReject(entry.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                          >
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Puantaj Detayları</h2>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Çalışan</label>
                  <p className="text-gray-900">Çalışan #{selectedEntry.userId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                  <p className="text-gray-900">{new Date(selectedEntry.date).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-900">{selectedEntry.location.address}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Koordinatlar: {selectedEntry.location.lat.toFixed(6)}, {selectedEntry.location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giriş Saati</label>
                  <p className="text-gray-900">{selectedEntry.checkIn}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Çıkış Saati</label>
                  <p className="text-gray-900">{selectedEntry.checkOut || 'Henüz çıkış yapılmadı'}</p>
                </div>
              </div>
              
              {selectedEntry.totalHours && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Toplam Çalışma Saati</label>
                    <p className="text-gray-900">{selectedEntry.totalHours} saat</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mola Süresi</label>
                    <p className="text-gray-900">{selectedEntry.breakDuration || 0} dakika</p>
                  </div>
                </div>
              )}
              
              {selectedEntry.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedEntry.notes}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEntry.status)}`}>
                  {getStatusIcon(selectedEntry.status)}
                  <span className="ml-2">{getStatusText(selectedEntry.status)}</span>
                </span>
              </div>
            </div>
            
            {selectedEntry.status === 'checked_out' && (
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleApprove(selectedEntry.id);
                    setSelectedEntry(null);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Onayla
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedEntry.id);
                    setSelectedEntry(null);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reddet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimesheetManagement;