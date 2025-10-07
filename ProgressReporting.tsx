import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Clock, 
  User, 
  FileText,
  Upload,
  X,
  CheckCircle,
  Eye,
  Filter,
  Search,
  Plus,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProgressReport {
  id: string;
  reporterId: string;
  projectId: string;
  taskId: string;
  title: string;
  description: string;
  progressPercentage: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photos: string[];
  workHours: number;
  materialsUsed: string[];
  nextSteps: string;
  issues: string;
  createdAt: string;
  approvedBy?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

const ProgressReporting: React.FC = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ProgressReport | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    progressPercentage: 0,
    workHours: 0,
    materialsUsed: [] as string[],
    nextSteps: '',
    issues: '',
    photos: [] as string[]
  });

  const mockReports: ProgressReport[] = [
    {
      id: '1',
      reporterId: user?.id || '1',
      projectId: '1',
      taskId: '1',
      title: 'Blok A 3. Kat Beton Döküm İlerlemesi',
      description: 'Kolon ve kiriş beton döküm işlemi tamamlandı. Kalite kontrol yapıldı.',
      progressPercentage: 85,
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'İstanbul Konut Projesi - Blok A, 3. Kat'
      },
      photos: ['progress1.jpg', 'progress2.jpg', 'progress3.jpg'],
      workHours: 8,
      materialsUsed: ['Beton C25 - 15m³', 'Vibratör', 'Kalıp malzemesi'],
      nextSteps: 'Beton kürleme işlemi başlatılacak. 24 saat bekletilecek.',
      issues: 'Hava koşulları nedeniyle 1 saat gecikme yaşandı.',
      createdAt: '2024-01-20T17:30:00Z',
      approvedBy: '2',
      status: 'approved'
    },
    {
      id: '2',
      reporterId: user?.id || '1',
      projectId: '1',
      taskId: '2',
      title: '4. Kat Demir Donatı Montajı',
      description: 'Kolon demirlerinin yerleştirilmesi ve bağlanması devam ediyor.',
      progressPercentage: 60,
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'İstanbul Konut Projesi - Blok A, 4. Kat'
      },
      photos: ['progress4.jpg', 'progress5.jpg'],
      workHours: 6,
      materialsUsed: ['Demir çubuk 16mm - 100 adet', 'Bağlama teli', 'Pense'],
      nextSteps: 'Kiriş demirlerinin montajına başlanacak.',
      issues: 'Malzeme tedarikinde küçük gecikme yaşandı.',
      createdAt: '2024-01-20T16:15:00Z',
      status: 'submitted'
    },
    {
      id: '3',
      reporterId: user?.id || '1',
      projectId: '2',
      taskId: '3',
      title: 'Duvar Örme İşlemi Günlük Raporu',
      description: 'İç duvar örme işlemine devam edildi. Günlük hedef aşıldı.',
      progressPercentage: 75,
      location: {
        lat: 39.9334,
        lng: 32.8597,
        address: 'Ankara AVM İnşaatı - B Blok, 2. Kat'
      },
      photos: ['progress6.jpg'],
      workHours: 7,
      materialsUsed: ['Tuğla - 500 adet', 'Harç - 10 çuval', 'Su'],
      nextSteps: 'Elektrik tesisatı için hazırlık yapılacak.',
      issues: 'Herhangi bir sorun yaşanmadı.',
      createdAt: '2024-01-19T18:00:00Z',
      status: 'draft'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
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
      case 'draft':
        return 'Taslak';
      case 'submitted':
        return 'Gönderildi';
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here would be the API call to create the progress report
    console.log('Creating progress report:', {
      ...formData,
      location: currentLocation,
      reporterId: user?.id,
      createdAt: new Date().toISOString()
    });

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      progressPercentage: 0,
      workHours: 0,
      materialsUsed: [],
      nextSteps: '',
      issues: '',
      photos: []
    });
    setShowCreateModal(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const addMaterial = (material: string) => {
    if (material.trim()) {
      setFormData(prev => ({
        ...prev,
        materialsUsed: [...prev.materialsUsed, material.trim()]
      }));
    }
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materialsUsed: prev.materialsUsed.filter((_, i) => i !== index)
    }));
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">İlerleme Raporları</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Rapor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rapor ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="draft">Taslak</option>
            <option value="submitted">Gönderildi</option>
            <option value="approved">Onaylandı</option>
            <option value="rejected">Reddedildi</option>
          </select>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
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
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>%{report.progressPercentage} tamamlandı</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{report.workHours} saat çalışıldı</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Camera className="w-4 h-4 mr-2" />
                  <span>{report.photos.length} fotoğraf</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(report.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${report.progressPercentage}%` }}
                ></div>
              </div>

              {report.photos.length > 0 && (
                <div className="flex space-x-2">
                  {report.photos.slice(0, 4).map((photo, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                  {report.photos.length > 4 && (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">+{report.photos.length - 4}</span>
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
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Yeni İlerleme Raporu</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rapor Başlığı *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Günlük ilerleme raporu başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yapılan İşler *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bugün yapılan işleri detaylı olarak açıklayın"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İlerleme Yüzdesi</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progressPercentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, progressPercentage: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0-100 arası"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Saati</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.workHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, workHours: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Saat cinsinden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kullanılan Malzemeler</label>
                <div className="space-y-2">
                  {formData.materialsUsed.map((material, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm">{material}</span>
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Malzeme adı ve miktarı"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addMaterial((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                        addMaterial(input.value);
                        input.value = '';
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sonraki Adımlar</label>
                <textarea
                  rows={3}
                  value={formData.nextSteps}
                  onChange={(e) => setFormData(prev => ({ ...prev, nextSteps: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yarın yapılacak işler ve planlar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sorunlar ve Gecikmeler</label>
                <textarea
                  rows={3}
                  value={formData.issues}
                  onChange={(e) => setFormData(prev => ({ ...prev, issues: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yaşanan sorunlar, gecikmeler veya özel durumlar"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İlerleme Fotoğrafları</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="progress-photo-upload"
                  />
                  <label
                    htmlFor="progress-photo-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">İlerleme fotoğrafları yükleyin</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (Maks. 5MB)</span>
                  </label>
                </div>

                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt={`İlerleme fotoğrafı ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }))}
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
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">İlerleme Raporu Detayları</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedReport.title}</h3>
                <p className="text-gray-600">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">İlerleme</span>
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-900 mt-2">%{selectedReport.progressPercentage}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">Çalışma Saati</span>
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-900 mt-2">{selectedReport.workHours}h</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600">Fotoğraf</span>
                    <Camera className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-900 mt-2">{selectedReport.photos.length}</p>
                </div>
              </div>

              {selectedReport.materialsUsed.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Kullanılan Malzemeler</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.materialsUsed.map((material, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport.nextSteps && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sonraki Adımlar</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedReport.nextSteps}</p>
                </div>
              )}

              {selectedReport.issues && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sorunlar ve Gecikmeler</h4>
                  <p className="text-gray-600 bg-red-50 p-3 rounded-lg">{selectedReport.issues}</p>
                </div>
              )}

              {selectedReport.photos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">İlerleme Fotoğrafları</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedReport.photos.map((photo, index) => (
                      <div key={index} className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">Fotoğraf {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Oluşturma Tarihi: {new Date(selectedReport.createdAt).toLocaleDateString('tr-TR')} {new Date(selectedReport.createdAt).toLocaleTimeString('tr-TR')}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                    {getStatusText(selectedReport.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReporting;