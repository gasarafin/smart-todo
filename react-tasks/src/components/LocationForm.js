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
            const placeData = await autoCompleteRef.current.getPlace()
            setTask((previousTask) => ({ 
                ...previousTask, gplaceID: placeData.place_id,
                gPlaceName: placeData.name,
                gPlaceLat: placeData.geometry.location.lat(),
                gPlaceLong: placeData.geometry.location.lng(),
            
            }))


            console.log(placeData)


        });
    }, []);

    return (
        <>
<div className="form-group">
                <label htmlFor="findLocation">Find Location</label>
                <input className="form-control" id="findLocation" name="findLocation" ref={inputRef} />
            </div>
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="placeName">Place</label>
                    <input className="form-control" id="placeName" name="placeName" value={task.gPlaceName} />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="placeID" >Place ID</label>
                    <input className="form-control" id="placeID" name="placeID" value={task.gplaceID} />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="placeLat">Latitude</label>
                    <input className="form-control" id="placeLat" name="placeLat" value={task.gPlaceLat} />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="placeLng" >Longitude</label>
                    <input className="form-control" id="placeLng" name="placeLng" value={task.gPlaceLong} />
                </div>
            </div>
        </>
    );
};

export default LocationForm;
