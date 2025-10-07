import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus, 
  Users, 
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Pin,
  Paperclip,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  attachments?: string[];
  isRead: boolean;
}

interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

const MessageCenter: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);

  const mockConversations: Conversation[] = [
    {
      id: '1',
      type: 'group',
      name: 'Beton Ekibi',
      participants: ['1', '2', '3', '4'],
      lastMessage: {
        id: '1',
        senderId: '2',
        senderName: 'Ali Çelik',
        senderRole: 'Ekip Başı',
        content: 'Yarın sabah 08:00\'da döküm başlayacak. Hazırlıkları tamamlayın.',
        timestamp: '2024-01-20T16:30:00Z',
        type: 'text',
        isRead: false
      },
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      type: 'direct',
      name: 'Mehmet Kaya - Sınıf Şefi',
      participants: ['1', '2'],
      lastMessage: {
        id: '2',
        senderId: '2',
        senderName: 'Mehmet Kaya',
        senderRole: 'Sınıf Şefi',
        content: 'Bugünkü ilerleme raporunu gönderebilir misin?',
        timestamp: '2024-01-20T15:45:00Z',
        type: 'text',
        isRead: true
      },
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '3',
      type: 'group',
      name: 'Güvenlik Ekibi',
      participants: ['1', '5', '6', '7'],
      lastMessage: {
        id: '3',
        senderId: '5',
        senderName: 'Fatma Demir',
        senderRole: 'Güvenlik Sorumlusu',
        content: 'Yeni güvenlik protokolü eklendi. Lütfen inceleyin.',
        timestamp: '2024-01-20T14:20:00Z',
        type: 'text',
        isRead: true
      },
      unreadCount: 0,
      isOnline: false
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Ali Çelik',
      senderRole: 'Ekip Başı',
      content: 'Günaydın ekip! Bugün Blok A\'da beton döküm işlemi var.',
      timestamp: '2024-01-20T08:00:00Z',
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      senderId: user?.id || '1',
      senderName: user?.name || 'Ben',
      senderRole: user?.role || 'team_member',
      content: 'Anlaşıldı. Malzemeler hazır, ekip yerinde.',
      timestamp: '2024-01-20T08:05:00Z',
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Zeynep Şahin',
      senderRole: 'Ekip Üyesi',
      content: 'Vibratör arızalı, yedek getirdim.',
      timestamp: '2024-01-20T08:10:00Z',
      type: 'text',
      isRead: true
    },
    {
      id: '4',
      senderId: '2',
      senderName: 'Ali Çelik',
      senderRole: 'Ekip Başı',
      content: 'Mükemmel! Saat 09:00\'da başlıyoruz.',
      timestamp: '2024-01-20T08:15:00Z',
      type: 'text',
      isRead: true
    }
  ];

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    // Here would be the API call to send message
    console.log('Sending message:', {
      conversationId: selectedConversation,
      content: messageText,
      senderId: user?.id
    });

    setMessageText('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
      return `${Math.floor(diffMs / (1000 * 60))} dk önce`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)} saat önce`;
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600';
      case 'discipline_chief':
        return 'text-blue-600';
      case 'warehouse_manager':
        return 'text-green-600';
      case 'team_leader':
        return 'text-orange-600';
      case 'team_member':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Mesaj Merkezi</h1>
        <button
          onClick={() => setShowNewChat(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Sohbet
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Sohbet ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="relative">
                        {conversation.type === 'group' ? (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage?.content}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">
                        {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex md:w-2/3 flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {selectedConv.type === 'group' ? (
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedConv.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConv.type === 'group' 
                            ? `${selectedConv.participants.length} üye`
                            : selectedConv.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.senderId === user?.id
                          ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg'
                          : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                      } px-4 py-2`}>
                        {message.senderId !== user?.id && (
                          <p className={`text-xs font-medium mb-1 ${getRoleColor(message.senderRole)}`}>
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === user?.id ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sohbet Seçin</h3>
                  <p className="text-gray-600">Mesajlaşmaya başlamak için bir sohbet seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Yeni Sohbet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sohbet Türü</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="direct">Birebir Mesaj</option>
                  <option value="group">Grup Sohbeti</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Katılımcılar</label>
                <input
                  type="text"
                  placeholder="Kullanıcı ara..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewChat(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;