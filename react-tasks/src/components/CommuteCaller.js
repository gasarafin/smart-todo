// src/components/CommuteCaller.js

//BUG CORS Origin error

import { useEffect, useState } from "react";

function CommuteCaller({ originLat, originLong, destLat, destLong }) {

    const [commuteTime, setCommuteTime] = useState([]);

    useEffect(() => {
        const fetchCommute = async () => {
            const response = await fetch(`https://api-v2.distancematrix.ai/maps/api/distancematrix/json?origins=${originLat},${originLong}&destinations=${destLat},${destLong}&key=${process.env.REACT_APP_DIS_MATRIX_API_KEY}`);

            if (response.ok) {
                const data = await response.json();
                setCommuteTime(data.rows.elements.distance.duration.text);
            } else {
                // TODO Exception Handling?
            }
        };
        fetchCommute();

    }, [originLat, originLong, destLat, destLong]);


    return (
        <>
            <p>Commute Time: {commuteTime}</p>
        </>
    );
};

export default CommuteCaller;