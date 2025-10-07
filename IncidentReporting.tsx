import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  User, 
  FileText,
  Upload,
  X,
  CheckCircle,
  Eye,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { IncidentReport } from '../../types/timesheet';

const IncidentReporting: React.FC = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    category: 'safety' as 'safety' | 'quality' | 'delay' | 'equipment' | 'other',
    photos: [] as string[]
  });

  const mockReports: IncidentReport[] = [
    {
      id: '1',
      reporterId: user?.id || '1',
      projectId: '1',
      title: 'Güvenlik bariyeri eksikliği',
      description: 'Blok A 3. katta güvenlik bariyerleri eksik. Düşme riski mevcut.',
      severity: 'high',
      category: 'safety',
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'İstanbul Konut Projesi - Blok A, 3. Kat'
      },
      photos: ['photo1.jpg', 'photo2.jpg'],
      status: 'open',
      assignedTo: '2',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      reporterId: user?.id || '1',
      projectId: '1',
      title: 'Beton kalite sorunu',
      description: 'Dökülen betonda çatlaklar gözlemlendi. Kalite kontrol gerekli.',
      severity: 'critical',
      category: 'quality',
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'İstanbul Konut Projesi - Blok A, 2. Kat'
      },
      photos: ['photo3.jpg'],
      status: 'investigating',
      assignedTo: '2',
      createdAt: '2024-01-19T14:15:00Z'
    },
    {
      id: '3',
      reporterId: user?.id || '1',
      projectId: '2',
      title: 'Ekipman arızası',
      description: 'Vinç sisteminde arıza tespit edildi. Çalışma durdu.',
      severity: 'high',
      category: 'equipment',
      location: {
        lat: 39.9334,
        lng: 32.8597,
        address: 'Ankara AVM İnşaatı - Ana Saha'
      },
      photos: ['photo4.jpg', 'photo5.jpg'],
      status: 'resolved',
      resolvedAt: '2024-01-18T16:45:00Z',
      createdAt: '2024-01-18T09:20:00Z'
    }
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Mevcut konum alındı'
          });
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          // Mock location for demo
          setCurrentLocation({
            lat: 41.0082,
            lng: 28.9784,
            address: 'İstanbul Konut Projesi - Şantiye Alanı'
          });
        }
      );
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'Kritik';
      case 'high':
        return 'Yüksek';
      case 'medium':
        return 'Orta';
      case 'low':
        return 'Düşük';
      default:
        return 'Bilinmiyor';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Açık';
      case 'investigating':
        return 'İnceleniyor';
      case 'resolved':
        return 'Çözüldü';
      case 'closed':
        return 'Kapatıldı';
      default:
        return 'Bilinmiyor';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'safety':
        return 'Güvenlik';
      case 'quality':
        return 'Kalite';
      case 'delay':
        return 'Gecikme';
      case 'equipment':
        return 'Ekipman';
      case 'other':
        return 'Diğer';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLocation) {
      alert('Konum bilgisi alınamadı. Lütfen tekrar deneyin.');
      return;
    }

    // Here would be the API call to create the incident report
    console.log('Creating incident report:', {
      ...formData,
      location: currentLocation,
      reporterId: user?.id,
      createdAt: new Date().toISOString()
    });

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      severity: 'medium',
      category: 'safety',
      photos: []
    });
    setShowCreateModal(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these files to a server
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Saha Raporlama</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Rapor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rapor ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="open">Açık</option>
            <option value="investigating">İnceleniyor</option>
            <option value="resolved">Çözüldü</option>
            <option value="closed">Kapatıldı</option>
          </select>
          
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tüm Öncelikler</option>
            <option value="critical">Kritik</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>
          
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getSeverityColor(report.severity)}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{getCategoryText(report.category)}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{getSeverityText(report.severity)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="truncate">{report.location.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{new Date(report.createdAt).toLocaleDateString('tr-TR')} {new Date(report.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Camera className="w-4 h-4 mr-2" />
                  <span>{report.photos.length} fotoğraf</span>
                </div>
              </div>

              {report.photos.length > 0 && (
                <div className="flex space-x-2 mb-4">
                  {report.photos.slice(0, 3).map((photo, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                  {report.photos.length > 3 && (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">+{report.photos.length - 3}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Yeni Saha Raporu</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rapor Başlığı *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Kısa ve açıklayıcı başlık girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Durumu detaylı olarak açıklayın"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="safety">Güvenlik</option>
                    <option value="quality">Kalite</option>
                    <option value="delay">Gecikme</option>
                    <option value="equipment">Ekipman</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Öncelik</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                    <option value="critical">Kritik</option>
                  </select>
                </div>
              </div>

              {/* Location Info */}
              {currentLocation && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Konum Bilgisi</span>
                  </div>
                  <p className="text-sm text-blue-800">{currentLocation.address}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  </p>
                </div>
              )}

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fotoğraflar</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Fotoğraf yüklemek için tıklayın</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (Maks. 5MB)</span>
                  </label>
                </div>

                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt={`Yüklenen fotoğraf ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Rapor Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Rapor Detayları</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <div className={`w-4 h-4 rounded-full mr-3 ${getSeverityColor(selectedReport.severity)}`}></div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedReport.title}</h3>
                </div>
                <p className="text-gray-600">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                    {getCategoryText(selectedReport.category)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Öncelik</label>
                  <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                    {getSeverityText(selectedReport.severity)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-900">{selectedReport.location.address}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedReport.location.lat.toFixed(6)}, {selectedReport.location.lng.toFixed(6)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oluşturma Tarihi</label>
                  <p className="text-gray-900">
                    {new Date(selectedReport.createdAt).toLocaleDateString('tr-TR')} {new Date(selectedReport.createdAt).toLocaleTimeString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                    {getStatusText(selectedReport.status)}
                  </span>
                </div>
              </div>

              {selectedReport.photos.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fotoğraflar</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedReport.photos.map((photo, index) => (
                      <div key={index} className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">Fotoğraf {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReporting;