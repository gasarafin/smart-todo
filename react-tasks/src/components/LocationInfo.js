// src/components/LocationInfo.js


// src/components/LocationInfo.js

//BUG CORS Origin error - but works in VS code as an http request

import { useEffect, useState, useRef} from "react";

function LocationInfo({ gplaceID }) {
    const [locationInfo, setLocationInfo] = useState([]);

    const locSearch = useRef();
    
    useEffect(() => {
        const options = {
            placeID: {gplaceID},
            fields: ["weekday_text"],
        };

        locSearch.current = new window.google.maps.places.PlacesService (
            options
        );

        const fetchLocation = async () => {

            const placeData = await locSearch.current.getDetails();
            setLocationInfo((previousLoc) => ({
                ...previousLoc, openingPeriod: placeData.weekday_text
            }))
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


























// import { useEffect, useState } from "react";

// function LocationInfo({ gplaceID }) {
//     const [locationInfo, setLocationInfo] = useState([]);

//     useEffect(() => {
//         const fetchLocation = async () => {
//             const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${gplaceID}&fields=opening_hours&key=${process.env.REACT_APP_GPLACES_API_KEY}`, {
//                 method: 'GET'
//               });

//             if (response.ok) {
//                 const locationData = await response.json();
//                 console.log(locationData)
//                 setLocationInfo(locationData);
//             } else {
//                 // TODO Exception Handling?
//             };
//         };
//         fetchLocation();

//     }, [gplaceID]);

    

//     return (
//         <>
//         {locationInfo === null ? "No Location Info" : `Location Hours: ${locationInfo}`}
//         {locationInfo}
//         <p>{`Is location empty ${locationInfo.values}`}</p>
//         </>
//     );
// };

// export default LocationInfo;