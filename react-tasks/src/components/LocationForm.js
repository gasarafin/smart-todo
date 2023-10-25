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
           
                <div className="form-group">
                    <label htmlFor="placeName">Find Location</label>
                    <input className="form-control" id="placeName" name="placeName" ref={inputRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="address1">Street Address</label>
                    <input className="form-control" id="address1" name="address1" />
                </div>
                <div className="form-group">
                    <label htmlFor="address2">Apartment, unit, suite, or floor #</label>
                    <input className="form-control" id="address2" name="address2" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input className="form-control" id="locality" name="locality" />
                </div>
                <div className="row">
                    <div className="form-group col-6">
                        <label htmlFor="state">State/Province</label>
                        <input className="form-control" id="state" name="state" />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="postcode">Postal code</label>
                        <input className="form-control" id="postcode" name="postcode" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="placeID" >Place ID</label>
                    <input className="form-control" id="placeID" name="placeID" value={place.place_id} />
                </div>
           
        </>
    );
};
export default LocationForm;
