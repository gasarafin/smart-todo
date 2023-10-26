import { useRef, useEffect, useState } from "react";

const LocationForm = () => {
    const [place, setPlace] = useState({});
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: {
            country: ["us"]
        },
        fields: ["name", "address_components", "place_id"],
    };


    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {

            setPlace(await autoCompleteRef.current.getPlace());
        });
    }, []);

    return (
        <>
           
           
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="placeName">Find Location</label>
                            <input className="form-control" id="placeName" name="placeName" ref={inputRef} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="placeID" >Place ID</label>
                            <input className="form-control" id="placeID" name="placeID" value={place.place_id} />
                        </div>
                    </div>
                
           
        </>
    );
};
export default LocationForm;
