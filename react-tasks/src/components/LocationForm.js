// src/components/LocationForm.js

import { useRef, useEffect } from "react";

const LocationForm = props => {
    const [task, setTask] = props.functions;

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    
    const options = {
        componentRestrictions: {
            country: ["us"]
        },
        fields: ["name", "geometry", "place_id"],
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            const placeData = await autoCompleteRef.current.getPlace();
            setTask((previousTask) => ({
                ...previousTask, gplaceID: placeData.place_id,
                gPlaceName: placeData.name,
                gPlaceLat: placeData.geometry.location.lat(),
                gPlaceLong: placeData.geometry.location.lng(),

            }));
        });
    });

    return (
        <>
            <div className="form-group my-2">
                <label htmlFor="findLocation" className="mb-1">Find Location</label>
                <input className="form-control" id="findLocation" name="findLocation" ref={inputRef} />
            </div>
            <div className="row my-2">
                <div className="form-group col-6">
                    <label htmlFor="placeName" className="mb-1">Place</label>
                    <input className="form-control" id="placeName" name="placeName" value={task.gPlaceName} readOnly />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="placeID" className="mb-1">Place ID</label>
                    <input className="form-control" id="placeID" name="placeID" value={task.gplaceID===null ? "" : task.gplaceID} readOnly />
                </div>
            </div>
            <div className="row my-2">
                <div className="form-group col-6">
                    <label htmlFor="placeLat" className="mb-1">Latitude</label>
                    <input className="form-control" id="placeLat" name="placeLat" value={task.gPlaceLat} readOnly />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="placeLng" className="mb-1">Longitude</label>
                    <input className="form-control" id="placeLng" name="placeLng" value={task.gPlaceLong} readOnly />
                </div>
            </div>
        </>
    );
};

export default LocationForm;
