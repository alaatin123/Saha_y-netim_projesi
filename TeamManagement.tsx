import React, { useState } from 'react';
import { Users, Plus, UserPlus, Search, CreditCard as Edit, Trash2, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface Team {
  id: string;
  name: string;
  disciplineName: string;
  leaderName: string;
  memberCount: number;
  status: 'active' | 'inactive';
  members: TeamMember[];
}

const TeamManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [filterDiscipline, setFilterDiscipline] = useState('all');

  const teams: Team[] = [
    {
      id: '1',
      name: 'İnşaat Ekibi A',
      disciplineName: 'Mimari',
      leaderName: 'Ahmet Yılmaz',
      memberCount: 8,
      status: 'active',
      members: [
        { id: '1', name: 'Ahmet Yılmaz', role: 'Ekip Lideri', joinDate: '2024-01-15', status: 'active' },
        { id: '2', name: 'Mehmet Kaya', role: 'Usta', joinDate: '2024-01-20', status: 'active' },
        { id: '3', name: 'Ali Demir', role: 'İşçi', joinDate: '2024-02-01', status: 'active' },
      ]
    },
    {
      id: '2',
      name: 'Elektrik Ekibi 1',
      disciplineName: 'Elektrik',
      leaderName: 'Can Öztürk',
      memberCount: 5,
      status: 'active',
      members: [
        { id: '4', name: 'Can Öztürk', role: 'Ekip Lideri', joinDate: '2024-01-10', status: 'active' },
        { id: '5', name: 'Emre Şahin', role: 'Elektrikçi', joinDate: '2024-01-15', status: 'active' },
      ]
    },
    {
      id: '3',
      name: 'Mekanik Ekibi B',
      disciplineName: 'Mekanik',
      leaderName: 'Veli Yurt',
      memberCount: 6,
      status: 'active',
      members: [
        { id: '6', name: 'Veli Yurt', role: 'Ekip Lideri', joinDate: '2024-02-01', status: 'active' },
      ]
    }
  ];

  const disciplines = ['Tümü', 'Mimari', 'Elektrik', 'Mekanik', 'Sıhhi Tesisat'];

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.leaderName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiscipline = filterDiscipline === 'all' ||
                             team.disciplineName.toLowerCase() === filterDiscipline.toLowerCase();
    return matchesSearch && matchesDiscipline;
  });

  const CreateTeamModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Yeni Ekip Oluştur</h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ekip Adı
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Örn: İnşaat Ekibi C"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disiplin
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Mimari</option>
              <option>Elektrik</option>
              <option>Mekanik</option>
              <option>Sıhhi Tesisat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ekip Lideri
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Lider Seçiniz</option>
              <option>Ahmet Yılmaz</option>
              <option>Can Öztürk</option>
              <option>Veli Yurt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ekip hakkında notlar..."
            />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Ekip Oluştur
          </button>
        </div>
      </div>
    </div>
  );

  const TeamMembersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedTeam?.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{selectedTeam?.disciplineName} - {selectedTeam?.leaderName}</p>
          </div>
          <button
            onClick={() => {
              setShowMemberModal(false);
              setSelectedTeam(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Ekip Üyeleri ({selectedTeam?.members.length})
            </h3>
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <UserPlus className="w-4 h-4 mr-2" />
              Üye Ekle
            </button>
          </div>

          <div className="space-y-3">
            {selectedTeam?.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Katılım: {new Date(member.joinDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ekip Yönetimi</h1>
          <p className="text-gray-600 mt-1">Tüm ekipleri ve üyeleri yönetin</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Ekip
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ekip veya lider ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {disciplines.map((discipline) => (
              <button
                key={discipline}
                onClick={() => setFilterDiscipline(discipline === 'Tümü' ? 'all' : discipline)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterDiscipline === (discipline === 'Tümü' ? 'all' : discipline)
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {discipline}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => {
                setSelectedTeam(team);
                setShowMemberModal(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  team.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {team.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{team.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{team.disciplineName}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ekip Lideri:</span>
                  <span className="font-medium text-gray-900">{team.leaderName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Üye Sayısı:</span>
                  <span className="font-medium text-gray-900">{team.memberCount} kişi</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTeam(team);
                    setShowMemberModal(true);
                  }}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Detayları Gör
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Ekip bulunamadı</p>
          </div>
        )}
      </div>

      {showCreateModal && <CreateTeamModal />}
      {showMemberModal && selectedTeam && <TeamMembersModal />}
    </div>
  );
};

export default TeamManagement;
