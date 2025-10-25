import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// fuerza el repintado del mapa cuando se muestra el modal
function FixMapResize() {
    const map = useMap();

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const modal = document.getElementById("default-modal");
            if (modal && !modal.classList.contains("hidden")) {
                // Espera un poco para que el modal termine de animar antes de recalcular
                setTimeout(() => {
                    map.invalidateSize();
                }, 300);
            }
        });

        // Observa cambios en el body (para detectar cuando el modal cambia de hidden a visible)
        observer.observe(document.body, { attributes: true, subtree: true });

        return () => observer.disconnect();
    }, [map]);

    return null;
}

export function LocationPicker({ onChange }) {
    const [position, setPosition] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    // Detectar la ubicación actual del dispositivo al montar
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const coords = {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    };
                    setPosition(coords);
                    setMapCenter([latitude, longitude]);
                    onChange(coords);
                },
                (err) => {
                    console.warn("No se pudo obtener la ubicación:", err.message);
                    // Fallback a Buenaventura
                    setMapCenter([3.8776, -77.0282]);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.warn("Geolocalización no soportada");
            setMapCenter([3.8776, -77.0282]);
        }
    }, []);

    const MapClick = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                const coords = { type: "Point", coordinates: [lng, lat] };
                setPosition(coords);
                onChange(coords);
            },
        });
        return null;
    };

    if (!mapCenter) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
                Obteniendo ubicación actual...
            </div>
        );
    }

    return (
        <div className="h-64 min-h-[300px] w-full">
            <MapContainer
                center={mapCenter}
                zoom={15}
                className="h-full w-full rounded z-0"
            >
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClick />
                <FixMapResize /> {/* Recalcula el tamaño al abrir el modal */}
                {position && (
                    <Marker position={[position.coordinates[1], position.coordinates[0]]} />
                )}
            </MapContainer>
        </div>
    );
}
