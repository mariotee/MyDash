/*
 * NOTE: the leaflet map config is managed in public/index.html
 */

import React from 'react';
import Leaflet from 'leaflet';
import PropTypes from 'prop-types';

import LeafletMarker from 'assets/icons/map/marker-icon.png';
import GreenMarker from 'assets/icons/map/marker-icon-green.png';
import OrangeMarker from 'assets/icons/map/marker-icon-orange.png';
import RedMarker from 'assets/icons/map/marker-icon-red.png';
import MarkerShadow from 'assets/icons/map/marker-shadow.png';

class Map extends React.Component {
  componentDidMount() {
    this.map = Leaflet.map('map', {
      dragging: !Leaflet.Browser.mobile,
      center: [40, -100],
      zoom: 4,
    });
    /*
     *  Providers can be managed with utils/leaflet-providers.js
     *  OR they can be managed with urls found from the following:
     *  http://leaflet-extras.github.io/leaflet-providers/preview/
     *
     *  some personal favourites:
     *  Cartoon-Like with detailed zooms: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
     *  Sattelite view with detailed zooms: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
     *  Darker Cartoon-Like, no detailed zoom: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
     *
     */
    const mapProviderURL =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    const options = {
      minZoom: 1,
      maxZoom: 8,
    };
    Leaflet.tileLayer(mapProviderURL, options).addTo(this.map);
    this.loadMap();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }

  componentDidUpdate() {
    this.map.removeLayer(this.markerGroup);
    this.loadMap();
  }

  loadMap = () => {
    this.markerGroup = Leaflet.layerGroup().addTo(this.map);

    this.props.data.forEach((location) => {
      let custom = Leaflet.icon({
        iconUrl: this.getIconFromStatus(location.status),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: MarkerShadow,
        shadowSize: [41, 41],
        popupAnchor: [1, -41],
      });

      let marker = Leaflet.marker([location.latitude, location.longitude], { icon: custom });

      let popupContent = `
        <div>
          ${location.city}, ${location.country}
          <br/>
          Status: ${location.status}
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
      marker.on('click', () => this.props.clickMarker(location));
      marker.addTo(this.markerGroup);
    });
  };

  getIconFromStatus = (status) => {
    switch (status) {
      case 'Running':
        return GreenMarker;
      case 'Busy':
        return OrangeMarker;
      case 'Down':
        return RedMarker;
      default:
        return LeafletMarker;
    }
  };

  render() {
    return <div id="map" style={{ height: this.props.height }} />;
  }
}

Map.propTypes = {
  height: PropTypes.number, //comes from 'react-container-dimensions' HOC
  data: PropTypes.array.isRequired,
  clickMarker: PropTypes.func.isRequired,
};

export default Map;
