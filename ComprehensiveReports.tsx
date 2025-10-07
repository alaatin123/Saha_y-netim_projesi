import React, { useState } from 'react';
import { BarChart3, FileText, Download, Calendar, Filter, TrendingUp, Users, Package, Clock, DollarSign } from 'lucide-react';

type ReportType = 'project' | 'material' | 'timesheet' | 'financial' | 'performance';
type DateRange = 'week' | 'month' | 'quarter' | 'year' | 'custom';

const ComprehensiveReports: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('project');
  const [dateRange, setDateRange] = useState<DateRange>('month');

  const reportTypes = [
    { id: 'project' as ReportType, label: 'Proje Raporları', icon: BarChart3 },
    { id: 'material' as ReportType, label: 'Malzeme Raporları', icon: Package },
    { id: 'timesheet' as ReportType, label: 'Puantaj Raporları', icon: Clock },
    { id: 'financial' as ReportType, label: 'Mali Raporlar', icon: DollarSign },
    { id: 'performance' as ReportType, label: 'Performans Raporları', icon: TrendingUp }
  ];

  const dateRanges = [
    { value: 'week' as DateRange, label: 'Bu Hafta' },
    { value: 'month' as DateRange, label: 'Bu Ay' },
    { value: 'quarter' as DateRange, label: 'Bu Çeyrek' },
    { value: 'year' as DateRange, label: 'Bu Yıl' },
    { value: 'custom' as DateRange, label: 'Özel Tarih' }
  ];

  const projectReportData = {
    summary: {
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 3,
      delayedProjects: 2,
      averageProgress: 68
    },
    projects: [
      {
        id: '1',
        name: 'İstanbul Konut Projesi',
        progress: 85,
        status: 'Zamanında',
        budget: 2500000,
        spent: 2100000,
        team: 45,
        startDate: '2024-01-15',
        endDate: '2024-06-15'
      },
      {
        id: '2',
        name: 'Ankara AVM İnşaatı',
        progress: 62,
        status: 'Zamanında',
        budget: 5000000,
        spent: 3100000,
        team: 32,
        startDate: '2024-02-01',
        endDate: '2024-08-20'
      },
      {
        id: '3',
        name: 'İzmir Ofis Binası',
        progress: 38,
        status: 'Riskli',
        budget: 3200000,
        spent: 1500000,
        team: 28,
        startDate: '2024-03-01',
        endDate: '2024-09-30'
      }
    ]
  };

  const materialReportData = {
    summary: {
      totalRequests: 145,
      approvedRequests: 98,
      pendingRequests: 32,
      rejectedRequests: 15,
      totalValue: 1850000
    },
    topMaterials: [
      { name: 'Çimento Portland', quantity: 450, unit: 'Ton', value: 225000 },
      { name: 'Demir Çubuk 12mm', quantity: 120, unit: 'Ton', value: 840000 },
      { name: 'Elektrik Kablosu', quantity: 5000, unit: 'Metre', value: 150000 },
      { name: 'PVC Boru', quantity: 3000, unit: 'Metre', value: 90000 },
      { name: 'Seramik Karo', quantity: 1200, unit: 'M²', value: 180000 }
    ]
  };

  const timesheetReportData = {
    summary: {
      totalHours: 8450,
      regularHours: 7200,
      overtimeHours: 1250,
      averagePerWorker: 42.5,
      activeWorkers: 198
    },
    departments: [
      { name: 'Mimari', workers: 45, hours: 1890, overtime: 280 },
      { name: 'Elektrik', workers: 32, hours: 1344, overtime: 180 },
      { name: 'Mekanik', workers: 38, hours: 1596, overtime: 220 },
      { name: 'Sıhhi Tesisat', workers: 28, hours: 1176, overtime: 150 },
      { name: 'Kaplama', workers: 55, hours: 2310, overtime: 420 }
    ]
  };

  const financialReportData = {
    summary: {
      totalBudget: 15200000,
      totalSpent: 9850000,
      remainingBudget: 5350000,
      budgetUtilization: 64.8,
      projectedOverrun: 0
    },
    breakdown: [
      { category: 'Malzeme', budget: 6000000, spent: 3850000, percentage: 64.2 },
      { category: 'İşçilik', budget: 5500000, spent: 3900000, percentage: 70.9 },
      { category: 'Ekipman', budget: 2200000, spent: 1450000, percentage: 65.9 },
      { category: 'Diğer', budget: 1500000, spent: 650000, percentage: 43.3 }
    ]
  };

  const performanceReportData = {
    summary: {
      overallScore: 8.2,
      onTimeDelivery: 85,
      qualityScore: 9.1,
      safetyScore: 8.8,
      efficiencyScore: 7.5
    },
    teams: [
      { name: 'İnşaat Ekibi A', leader: 'Ahmet Yılmaz', score: 8.5, tasks: 45, completed: 42 },
      { name: 'Elektrik Ekibi 1', leader: 'Can Öztürk', score: 8.8, tasks: 32, completed: 30 },
      { name: 'Mekanik Ekibi B', leader: 'Veli Yurt', score: 7.9, tasks: 28, completed: 24 },
      { name: 'İnşaat Ekibi B', leader: 'Zeynep Şahin', score: 8.1, tasks: 38, completed: 35 }
    ]
  };

  const renderProjectReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Toplam Proje</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{projectReportData.summary.totalProjects}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Aktif</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{projectReportData.summary.activeProjects}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Tamamlanan</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{projectReportData.summary.completedProjects}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Gecikmeli</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{projectReportData.summary.delayedProjects}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Ort. İlerleme</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">{projectReportData.summary.averageProgress}%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proje Detayları</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Proje</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">İlerleme</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Durum</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Bütçe</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Harcama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Ekip</th>
              </tr>
            </thead>
            <tbody>
              {projectReportData.projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">{project.name}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Zamanında' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">₺{project.budget.toLocaleString('tr-TR')}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">₺{project.spent.toLocaleString('tr-TR')}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{project.team} kişi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMaterialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Toplam Talep</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{materialReportData.summary.totalRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Onaylanan</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{materialReportData.summary.approvedRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Bekleyen</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{materialReportData.summary.pendingRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Reddedilen</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{materialReportData.summary.rejectedRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Toplam Değer</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">₺{(materialReportData.summary.totalValue / 1000).toFixed(0)}K</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">En Çok Kullanılan Malzemeler</h3>
        <div className="space-y-4">
          {materialReportData.topMaterials.map((material, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{material.name}</h4>
                  <p className="text-sm text-gray-600">{material.quantity} {material.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₺{material.value.toLocaleString('tr-TR')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimesheetReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Toplam Saat</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{timesheetReportData.summary.totalHours}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Normal Saat</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{timesheetReportData.summary.regularHours}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Fazla Mesai</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">{timesheetReportData.summary.overtimeHours}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Ortalama</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{timesheetReportData.summary.averagePerWorker}h</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Aktif İşçi</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{timesheetReportData.summary.activeWorkers}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Disiplinlere Göre Çalışma Saatleri</h3>
        <div className="space-y-4">
          {timesheetReportData.departments.map((dept, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{dept.name}</h4>
                <span className="text-sm text-gray-600">{dept.workers} işçi</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Toplam Saat</p>
                  <p className="font-semibold text-gray-900">{dept.hours}h</p>
                </div>
                <div>
                  <p className="text-gray-600">Fazla Mesai</p>
                  <p className="font-semibold text-orange-600">{dept.overtime}h</p>
                </div>
                <div>
                  <p className="text-gray-600">Kişi Başı</p>
                  <p className="font-semibold text-blue-600">{(dept.hours / dept.workers).toFixed(1)}h</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Toplam Bütçe</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">₺{(financialReportData.summary.totalBudget / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Harcanan</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">₺{(financialReportData.summary.totalSpent / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Kalan</p>
          <p className="text-2xl font-bold text-green-600 mt-2">₺{(financialReportData.summary.remainingBudget / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Kullanım</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{financialReportData.summary.budgetUtilization.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Tahmini Aşım</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">₺{financialReportData.summary.projectedOverrun}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bütçe Dağılımı</h3>
        <div className="space-y-4">
          {financialReportData.breakdown.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{item.category}</h4>
                <span className="text-sm font-semibold text-gray-900">{item.percentage.toFixed(1)}%</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-600">Bütçe</p>
                  <p className="font-semibold text-gray-900">₺{item.budget.toLocaleString('tr-TR')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Harcanan</p>
                  <p className="font-semibold text-orange-600">₺{item.spent.toLocaleString('tr-TR')}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Genel Puan</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{performanceReportData.summary.overallScore}/10</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Zamanında Teslim</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{performanceReportData.summary.onTimeDelivery}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Kalite</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{performanceReportData.summary.qualityScore}/10</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Güvenlik</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">{performanceReportData.summary.safetyScore}/10</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-600">Verimlilik</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{performanceReportData.summary.efficiencyScore}/10</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ekip Performansı</h3>
        <div className="space-y-4">
          {performanceReportData.teams.map((team, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{team.name}</h4>
                  <p className="text-sm text-gray-600">Lider: {team.leader}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{team.score}</p>
                  <p className="text-xs text-gray-600">/ 10</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Toplam Görev</p>
                  <p className="font-semibold text-gray-900">{team.tasks}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tamamlanan</p>
                  <p className="font-semibold text-green-600">{team.completed}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(team.completed / team.tasks) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReportType) {
      case 'project':
        return renderProjectReport();
      case 'material':
        return renderMaterialReport();
      case 'timesheet':
        return renderTimesheetReport();
      case 'financial':
        return renderFinancialReport();
      case 'performance':
        return renderPerformanceReport();
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
          <p className="text-gray-600 mt-1">Detaylı analiz ve raporları görüntüleyin</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md">
          <Download className="w-5 h-5 mr-2" />
          Raporu İndir
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rapor Tipi
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReportType(type.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    selectedReportType === type.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mb-2 ${
                    selectedReportType === type.id ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                  <span className={`text-xs font-medium text-center ${
                    selectedReportType === type.id ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarih Aralığı
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {renderReportContent()}
    </div>
  );
};

export default ComprehensiveReports;
