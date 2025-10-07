import React, { useState } from 'react';
import { Megaphone, Plus, Search, Filter, Eye, CreditCard as Edit, Trash2, Pin, Clock, User, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'safety' | 'maintenance';
  authorId: string;
  authorName: string;
  authorRole: string;
  targetAudience: string[];
  isPinned: boolean;
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
  attachments?: string[];
}

const AnnouncementCenter: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general' as 'general' | 'urgent' | 'safety' | 'maintenance',
    targetAudience: [] as string[],
    isPinned: false,
    expiresAt: ''
  });

  const mockAnnouncements: Announcement[] = [
    {
      id: '1',
      title: 'Yeni Güvenlik Protokolü Uygulaması',
      content: 'Tüm çalışanların dikkatine! 25 Ocak tarihinden itibaren yeni güvenlik protokolü uygulanacaktır. Lütfen ekteki dokümanı inceleyin ve gerekli eğitimlere katılın.',
      type: 'safety',
      authorId: '1',
      authorName: 'Ahmet Yılmaz',
      authorRole: 'Yönetici',
      targetAudience: ['all'],
      isPinned: true,
      isRead: false,
      createdAt: '2024-01-20T09:00:00Z',
      expiresAt: '2024-02-20T23:59:59Z',
      attachments: ['guvenlik-protokolu.pdf']
    },
    {
      id: '2',
      title: 'Haftalık Ekip Toplantısı',
      content: 'Bu hafta Cuma günü saat 16:00\'da tüm ekip başları ile haftalık değerlendirme toplantısı yapılacaktır. Toplantı konferans salonunda gerçekleşecektir.',
      type: 'general',
      authorId: '2',
      authorName: 'Mehmet Kaya',
      authorRole: 'Sınıf Şefi',
      targetAudience: ['team_leader', 'discipline_chief'],
      isPinned: false,
      isRead: true,
      createdAt: '2024-01-19T14:30:00Z'
    },
    {
      id: '3',
      title: 'ACİL: Elektrik Kesintisi',
      content: 'Yarın (21 Ocak) saat 10:00-12:00 arası planlı elektrik kesintisi olacaktır. Bu süre zarfında elektrikli aletlerin kullanımına ara verilecektir.',
      type: 'urgent',
      authorId: '1',
      authorName: 'Ahmet Yılmaz',
      authorRole: 'Yönetici',
      targetAudience: ['all'],
      isPinned: true,
      isRead: false,
      createdAt: '2024-01-19T16:45:00Z',
      expiresAt: '2024-01-21T12:00:00Z'
    },
    {
      id: '4',
      title: 'Vinç Bakım Çalışması',
      content: 'Ana vinç sisteminde rutin bakım çalışması yapılacaktır. 22-23 Ocak tarihleri arasında vinç kullanılamayacaktır. Alternatif planlarınızı yapın.',
      type: 'maintenance',
      authorId: '3',
      authorName: 'Fatma Demir',
      authorRole: 'Depo Sorumlusu',
      targetAudience: ['team_leader', 'discipline_chief'],
      isPinned: false,
      isRead: true,
      createdAt: '2024-01-18T11:20:00Z'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'safety':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'general':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4" />;
      case 'safety':
        return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance':
        return <Info className="w-4 h-4" />;
      case 'general':
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'Acil';
      case 'safety':
        return 'Güvenlik';
      case 'maintenance':
        return 'Bakım';
      case 'general':
        return 'Genel';
      default:
        return 'Genel';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here would be the API call to create announcement
    console.log('Creating announcement:', {
      ...formData,
      authorId: user?.id,
      createdAt: new Date().toISOString()
    });

    // Reset form and close modal
    setFormData({
      title: '',
      content: '',
      type: 'general',
      targetAudience: [],
      isPinned: false,
      expiresAt: ''
    });
    setShowCreateModal(false);
  };

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Duyuru Merkezi</h1>
        {(user?.role === 'admin' || user?.role === 'discipline_chief') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Duyuru
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Duyuru ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tüm Türler</option>
            <option value="urgent">Acil</option>
            <option value="safety">Güvenlik</option>
            <option value="maintenance">Bakım</option>
            <option value="general">Genel</option>
          </select>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow ${
              !announcement.isRead ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {announcement.isPinned && (
                      <Pin className="w-4 h-4 text-orange-500 mr-2" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    {!announcement.isRead && (
                      <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(announcement.type)}`}>
                      {getTypeIcon(announcement.type)}
                      <span className="ml-1">{getTypeText(announcement.type)}</span>
                    </span>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      <span>{announcement.authorName} - {announcement.authorRole}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(announcement.createdAt).toLocaleDateString('tr-TR')} {new Date(announcement.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{announcement.content}</p>
                  
                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="flex items-center text-sm text-blue-600 mb-4">
                      <span>{announcement.attachments.length} ek dosya</span>
                    </div>
                  )}
                  
                  {announcement.expiresAt && (
                    <div className="text-sm text-orange-600">
                      Son geçerlilik: {new Date(announcement.expiresAt).toLocaleDateString('tr-TR')}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedAnnouncement(announcement)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {(user?.role === 'admin' || announcement.authorId === user?.id) && (
                    <>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Yeni Duyuru Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duyuru Başlığı *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Duyuru başlığını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duyuru İçeriği *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Duyuru içeriğini detaylı olarak yazın"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duyuru Türü</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">Genel</option>
                    <option value="urgent">Acil</option>
                    <option value="safety">Güvenlik</option>
                    <option value="maintenance">Bakım</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Son Geçerlilik Tarihi</label>
                  <input
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hedef Kitle</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Tüm Çalışanlar</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Sınıf Şefleri</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Ekip Başları</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Depo Sorumluları</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPinned" className="ml-2 text-sm text-gray-700">
                  Bu duyuruyu sabitle (üstte göster)
                </label>
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
                  Duyuru Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Duyuru Detayları</h2>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  {selectedAnnouncement.isPinned && (
                    <Pin className="w-4 h-4 text-orange-500 mr-2" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{selectedAnnouncement.title}</h3>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(selectedAnnouncement.type)}`}>
                    {getTypeIcon(selectedAnnouncement.type)}
                    <span className="ml-1">{getTypeText(selectedAnnouncement.type)}</span>
                  </span>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    <span>{selectedAnnouncement.authorName} - {selectedAnnouncement.authorRole}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedAnnouncement.content}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Yayın Tarihi</label>
                  <p className="text-gray-900">
                    {new Date(selectedAnnouncement.createdAt).toLocaleDateString('tr-TR')} {new Date(selectedAnnouncement.createdAt).toLocaleTimeString('tr-TR')}
                  </p>
                </div>
                
                {selectedAnnouncement.expiresAt && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Son Geçerlilik</label>
                    <p className="text-gray-900">
                      {new Date(selectedAnnouncement.expiresAt).toLocaleDateString('tr-TR')} {new Date(selectedAnnouncement.expiresAt).toLocaleTimeString('tr-TR')}
                    </p>
                  </div>
                )}
              </div>

              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Ek Dosyalar</label>
                  <div className="space-y-2">
                    {selectedAnnouncement.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-900">{attachment}</span>
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

export default AnnouncementCenter;