// src/components/LocationInfo.js

//BUG CORS Origin error - but works in VS code as an http request

import { useEffect, useState } from "react";

function LocationInfo({ gplaceID }) {
    const [locationInfo, setLocationInfo] = useState([]);

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=${process.env.REACT_APP_GPLACES_API_KEY}`);

            if (response.ok) {
                const locationData = await response.json();
                setLocationInfo(locationData.rows.elements.distance.duration.text);
            } else {
                // TODO Exception Handling?
            }
        };
        fetchLocation();

    }, [gplaceID]);

    return (
        <>
            {/* TODO This isn't in a final usable form - probably needs a table */}
            <p>Location Hours: {locationInfo}</p>
        </>
    );
};

export default LocationInfo;