import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { io } from 'socket.io-client';
import API from '../services/api';
import 'leaflet/dist/leaflet.css';
import './ScooterMap.css';

const KALYANI_CENTER = [22.9749, 88.4495];

const statusColors = {
    available: '#06d6a0',
    'in-use': '#ff4757',
    maintenance: '#ffa502',
};

const statusLabels = {
    available: '🟢 Available',
    'in-use': '🔴 Booked',
    maintenance: '🟡 Maintenance',
};

// Component to auto-fit map bounds
const FitBounds = ({ vehicles }) => {
    const map = useMap();
    useEffect(() => {
        if (vehicles.length > 0) {
            const bounds = vehicles
                .filter(v => v.latitude && v.longitude)
                .map(v => [v.latitude, v.longitude]);
            if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
            }
        }
    }, [vehicles, map]);
    return null;
};

const ScooterMap = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ available: 0, inUse: 0, total: 0 });
    const socketRef = useRef(null);

    // Fetch vehicles
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const { data } = await API.get('/vehicles');
                setVehicles(data);
                updateStats(data);
            } catch (err) {
                console.error('Error fetching vehicles for map');
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    // Socket.io real-time updates
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_API_URL
            ? process.env.REACT_APP_API_URL.replace('/api', '')
            : 'https://ridefleet-api.onrender.com';

        socketRef.current = io(backendUrl, {
            transports: ['websocket', 'polling'],
        });

        socketRef.current.on('vehicle-status-change', (data) => {
            setVehicles(prev => {
                const updated = prev.map(v =>
                    v._id === data.vehicleId ? { ...v, status: data.status } : v
                );
                updateStats(updated);
                return updated;
            });
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const updateStats = (vehicleList) => {
        setStats({
            available: vehicleList.filter(v => v.status === 'available').length,
            inUse: vehicleList.filter(v => v.status === 'in-use').length,
            total: vehicleList.length,
        });
    };

    if (loading) {
        return (
            <div className="map-loading">
                <div className="map-spinner"></div>
                <p>Loading live map...</p>
            </div>
        );
    }

    return (
        <div className="map-page">
            <div className="map-header">
                <h1 className="map-title">
                    <span className="section-title">🗺️ Live Scooter Map</span>
                </h1>
                <p className="map-subtitle">
                    Real-time scooter locations near JIS College of Engineering, Kalyani
                </p>

                {/* Stats */}
                <div className="map-stats">
                    <div className="map-stat">
                        <span className="stat-dot available"></span>
                        <span className="stat-num">{stats.available}</span>
                        <span className="stat-label">Available</span>
                    </div>
                    <div className="map-stat">
                        <span className="stat-dot in-use"></span>
                        <span className="stat-num">{stats.inUse}</span>
                        <span className="stat-label">In Use</span>
                    </div>
                    <div className="map-stat">
                        <span className="stat-dot total"></span>
                        <span className="stat-num">{stats.total}</span>
                        <span className="stat-label">Total</span>
                    </div>
                </div>
            </div>

            <div className="map-container">
                <MapContainer
                    center={KALYANI_CENTER}
                    zoom={14}
                    style={{ height: '100%', width: '100%', borderRadius: '16px' }}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitBounds vehicles={vehicles} />

                    {vehicles
                        .filter(v => v.latitude && v.longitude)
                        .map((vehicle) => (
                            <CircleMarker
                                key={vehicle._id}
                                center={[vehicle.latitude, vehicle.longitude]}
                                radius={12}
                                fillColor={statusColors[vehicle.status] || '#666'}
                                color="rgba(255,255,255,0.8)"
                                weight={2}
                                fillOpacity={0.9}
                            >
                                <Popup>
                                    <div className="map-popup">
                                        <h4>{vehicle.model}</h4>
                                        <p className="popup-type">
                                            {vehicle.type === 'bike' ? '🚲' : '🛵'} {vehicle.type}
                                        </p>
                                        <p className="popup-status">
                                            {statusLabels[vehicle.status]}
                                        </p>
                                        <div className="popup-specs">
                                            <span>🔋 {vehicle.battery}%</span>
                                            <span>🛣️ {vehicle.mileage} km</span>
                                        </div>
                                        <p className="popup-location">📍 {vehicle.location}</p>
                                        {vehicle.status === 'available' && (
                                            <a href="/vehicles" className="popup-book-btn">
                                                Book Now →
                                            </a>
                                        )}
                                    </div>
                                </Popup>
                            </CircleMarker>
                        ))}
                </MapContainer>

                {/* Legend */}
                <div className="map-legend">
                    <h4>Legend</h4>
                    <div className="legend-item">
                        <span className="legend-dot" style={{ background: '#06d6a0' }}></span>
                        Available
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot" style={{ background: '#ff4757' }}></span>
                        Booked / In Use
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot" style={{ background: '#ffa502' }}></span>
                        Maintenance
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScooterMap;
