import React, { useState } from 'react';
import { Users, Plus, Search, CreditCard as Edit, Trash2, X, UserCheck, UserX, Mail, Phone } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'discipline_chief' | 'warehouse_manager' | 'team_leader' | 'team_member';
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
}

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      phone: '+90 532 123 4567',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      lastActive: '2024-03-15T10:30:00'
    },
    {
      id: '2',
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@example.com',
      phone: '+90 533 234 5678',
      role: 'discipline_chief',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-03-15T09:15:00'
    },
    {
      id: '3',
      name: 'Ayşe Demir',
      email: 'ayse.demir@example.com',
      phone: '+90 534 345 6789',
      role: 'warehouse_manager',
      status: 'active',
      joinDate: '2024-02-01',
      lastActive: '2024-03-15T11:45:00'
    },
    {
      id: '4',
      name: 'Can Öztürk',
      email: 'can.ozturk@example.com',
      phone: '+90 535 456 7890',
      role: 'team_leader',
      status: 'active',
      joinDate: '2024-02-10',
      lastActive: '2024-03-14T16:20:00'
    },
    {
      id: '5',
      name: 'Zeynep Şahin',
      email: 'zeynep.sahin@example.com',
      phone: '+90 536 567 8901',
      role: 'team_member',
      status: 'active',
      joinDate: '2024-02-15',
      lastActive: '2024-03-15T08:00:00'
    },
    {
      id: '6',
      name: 'Ali Yurt',
      email: 'ali.yurt@example.com',
      phone: '+90 537 678 9012',
      role: 'team_member',
      status: 'inactive',
      joinDate: '2024-01-20',
      lastActive: '2024-03-10T14:30:00'
    }
  ];

  const roleLabels: Record<string, string> = {
    admin: 'Yönetici',
    discipline_chief: 'Disiplin Şefi',
    warehouse_manager: 'Depo Müdürü',
    team_leader: 'Ekip Lideri',
    team_member: 'Ekip Üyesi'
  };

  const roles = ['Tümü', 'Yönetici', 'Disiplin Şefi', 'Depo Müdürü', 'Ekip Lideri', 'Ekip Üyesi'];
  const statuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' ||
                       roleLabels[user.role] === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'discipline_chief':
        return 'bg-blue-100 text-blue-800';
      case 'warehouse_manager':
        return 'bg-green-100 text-green-800';
      case 'team_leader':
        return 'bg-orange-100 text-orange-800';
      case 'team_member':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    return `${diffDays} gün önce`;
  };

  const UserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
          </h2>
          <button
            onClick={() => {
              setShowAddModal(false);
              setSelectedUser(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                defaultValue={selectedUser?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Örn: Ahmet Yılmaz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                defaultValue={selectedUser?.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                defaultValue={selectedUser?.phone}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="+90 5XX XXX XX XX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                defaultValue={selectedUser?.role}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="admin">Yönetici</option>
                <option value="discipline_chief">Disiplin Şefi</option>
                <option value="warehouse_manager">Depo Müdürü</option>
                <option value="team_leader">Ekip Lideri</option>
                <option value="team_member">Ekip Üyesi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <select
                defaultValue={selectedUser?.status}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>

            {!selectedUser && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={() => {
              setShowAddModal(false);
              setSelectedUser(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            {selectedUser ? 'Güncelle' : 'Kullanıcı Ekle'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-gray-600 mt-1">Sistem kullanıcılarını yönetin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Kullanıcı
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.active}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pasif</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.inactive}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Yönetici</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">{stats.admins}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
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
              placeholder="Kullanıcı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role === 'Tümü' ? 'all' : role)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterRole === (role === 'Tümü' ? 'all' : role)
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role}
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

        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      {user.phone}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Son aktif: {formatLastActive(user.lastActive)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right mr-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {roleLabels[user.role]}
                  </span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowAddModal(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Kullanıcı bulunamadı</p>
          </div>
        )}
      </div>

      {showAddModal && <UserModal />}
    </div>
  );
};

export default UserManagement;
