// src/components/LocationInfo.js

import { useEffect, useState, useRef } from 'react';

function LocationInfo({ gplaceID }) {
    const [locationInfo, setLocationInfo] = useState([]);
    const mapRef = useRef();

    useEffect(() => {
        const request = {
            placeId: gplaceID,
            fields: ['opening_hours'],
        };

        var map;

        function initialize() {
            map = new window.google.maps.Map(mapRef.current, {
                center: { lat: -33.8666, lng: 151.1958 },
                zoom: 15,
            });
        }
        initialize();

        var service = new window.google.maps.places.PlacesService(map);

        service.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                try {
                    setLocationInfo(place.opening_hours.weekday_text)
                } catch {
                    setLocationInfo([])
                }
            }
        });
    }, [gplaceID]);

    return (
        <div> 
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Opening Hours</th>
                </tr>
                <tr>
                    <td>{locationInfo[0]}</td>
                </tr>
                <tr>
                    <td>{locationInfo[1]}</td>
                </tr>
                <tr>
                    <td>{locationInfo[2]}</td>
                </tr>
                <tr>
                    <td>{locationInfo[3]}</td>
                </tr>
                <tr>
                    <td>{locationInfo[4]}</td>
                </tr>
                <tr>
                    <td>{locationInfo[5]}</td>
                </tr>
                <tr>
                    <td>{locationInfo[6]}</td>
                </tr>
                </thead>
            </table>
            <div id='map' ref={mapRef}></div>
        </div>
    );
}

export default LocationInfo;