import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Play, 
  Square, 
  Navigation, 
  AlertTriangle,
  CheckCircle,
  Loader,
  Calendar,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  accuracy: number;
}

const LocationTimesheet: React.FC = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [workingHours, setWorkingHours] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);

  // Mock project locations for validation
  const allowedLocations = [
    {
      name: 'İstanbul Konut Projesi',
      lat: 41.0082,
      lng: 28.9784,
      radius: 100 // meters
    },
    {
      name: 'Ankara AVM İnşaatı',
      lat: 39.9334,
      lng: 32.8597,
      radius: 150
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const startTime = new Date(`${new Date().toDateString()} ${checkInTime}`);
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        setWorkingHours(Math.max(0, diffHours - (breakTime / 60)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime, breakTime]);

  const getCurrentLocation = async (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Mock reverse geocoding - in real app, use a geocoding service
          const address = await mockReverseGeocode(latitude, longitude);
          
          resolve({
            lat: latitude,
            lng: longitude,
            address,
            accuracy
          });
        },
        (error) => {
          let errorMessage = 'Konum alınamadı.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Konum izni reddedildi.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Konum bilgisi mevcut değil.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Konum alma işlemi zaman aşımına uğradı.';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const mockReverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Mock implementation - in real app, use Google Maps or similar service
    const nearestProject = allowedLocations.find(location => {
      const distance = calculateDistance(lat, lng, location.lat, location.lng);
      return distance <= location.radius;
    });
    
    return nearestProject ? nearestProject.name : `Konum: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const isLocationValid = (location: LocationData): boolean => {
    return allowedLocations.some(allowedLocation => {
      const distance = calculateDistance(
        location.lat, 
        location.lng, 
        allowedLocation.lat, 
        allowedLocation.lng
      );
      return distance <= allowedLocation.radius;
    });
  };

  const handleLocationUpdate = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      if (!isLocationValid(location)) {
        setLocationError('Şantiye alanı dışındasınız. Lütfen çalışma alanına gidin.');
      }
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : 'Konum alınamadı');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleCheckIn = async () => {
    if (!currentLocation) {
      await handleLocationUpdate();
      return;
    }

    if (!isLocationValid(currentLocation)) {
      setLocationError('Şantiye alanı dışında giriş yapamazsınız.');
      return;
    }

    setIsCheckedIn(true);
    setCheckInTime(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
    setLocationError(null);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
    setWorkingHours(0);
    setBreakTime(0);
    setIsOnBreak(false);
  };

  const handleBreakToggle = () => {
    if (isOnBreak) {
      // End break
      setIsOnBreak(false);
    } else {
      // Start break
      setIsOnBreak(true);
      const breakStart = Date.now();
      const breakInterval = setInterval(() => {
        if (!isOnBreak) {
          clearInterval(breakInterval);
          return;
        }
        const breakDuration = (Date.now() - breakStart) / (1000 * 60); // minutes
        setBreakTime(prev => prev + 1);
      }, 60000);
    }
  };

  useEffect(() => {
    handleLocationUpdate();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Konum Tabanlı Puantaj</h1>
        <div className="text-xs md:text-sm text-gray-600">
          {new Date().toLocaleDateString('tr-TR')}
        </div>
      </div>

      {/* Current Status Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-3 ${
              isCheckedIn ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
            }`}></div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isCheckedIn ? 'Mesaide' : 'Mesai Dışı'}
            </h2>
          </div>
          {isCheckedIn && (
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
              Aktif
            </span>
          )}
        </div>

        {isCheckedIn && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(workingHours)}:{String(Math.floor((workingHours % 1) * 60)).padStart(2, '0')}
              </p>
              <p className="text-sm text-gray-600">Çalışma Saati</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{checkInTime}</p>
              <p className="text-sm text-gray-600">Giriş Saati</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{Math.floor(breakTime)}</p>
              <p className="text-sm text-gray-600">Mola (dk)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {isOnBreak ? 'Molada' : 'Çalışıyor'}
              </p>
              <p className="text-sm text-gray-600">Durum</p>
            </div>
          </div>
        )}
      </div>

      {/* Location Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Konum Bilgisi</h2>
          <button
            onClick={handleLocationUpdate}
            disabled={isLoadingLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center disabled:opacity-50"
          >
            {isLoadingLocation ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 mr-2" />
            )}
            Konumu Güncelle
          </button>
        </div>

        {locationError && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">{locationError}</p>
            </div>
          </div>
        )}

        {currentLocation && (
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="font-medium">{currentLocation.address}</p>
                <p className="text-sm text-gray-500">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
                <p className="text-xs text-gray-400">
                  Doğruluk: ±{Math.round(currentLocation.accuracy)}m
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              {isLocationValid(currentLocation) ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Geçerli çalışma alanı</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Çalışma alanı dışında</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {!isCheckedIn ? (
          <button
            onClick={handleCheckIn}
            disabled={!currentLocation || !isLocationValid(currentLocation) || isLoadingLocation}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition-colors font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-6 h-6 mr-3" />
            Mesai Başlat
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleBreakToggle}
              className={`w-full py-3 px-6 rounded-xl transition-colors font-medium flex items-center justify-center ${
                isOnBreak 
                  ? 'bg-orange-600 text-white hover:bg-orange-700' 
                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
              }`}
            >
              <Clock className="w-5 h-5 mr-2" />
              {isOnBreak ? 'Molayı Bitir' : 'Mola Ver'}
            </button>
            
            <button
              onClick={handleCheckOut}
              className="w-full bg-red-600 text-white py-4 px-6 rounded-xl hover:bg-red-700 transition-colors font-medium text-lg flex items-center justify-center"
            >
              <Square className="w-6 h-6 mr-3" />
              Mesai Bitir
            </button>
          </div>
        )}
      </div>

      {/* Today's Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bugünkü Özet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-900">
              {Math.floor(workingHours)}:{String(Math.floor((workingHours % 1) * 60)).padStart(2, '0')}
            </p>
            <p className="text-sm text-blue-600">Toplam Çalışma</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-900">{checkInTime || '--:--'}</p>
            <p className="text-sm text-green-600">Giriş Saati</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <User className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-orange-900">{Math.floor(breakTime)}</p>
            <p className="text-sm text-orange-600">Mola (dk)</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-900">
              {currentLocation && isLocationValid(currentLocation) ? '✓' : '✗'}
            </p>
            <p className="text-sm text-purple-600">Konum Durumu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTimesheet;