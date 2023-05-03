import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '../assets/location-icon.png';
import L from 'leaflet';

const myIcon = L.icon({
    iconUrl: LocationOnIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

const MyMap = (props) => {
    const position = [props.latitude, props.longitude];

    return (
        <MapContainer center={position} zoom={15} dragging={false} style={{ height: '200px', width: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={myIcon}>
                <Popup>
                    {props.nome}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default MyMap;