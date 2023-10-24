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
            <form >
                <div className="form-group">
                    <label for="placeName">Find Location</label>
                    <input className="form-control" id="placeName" name="placeName" ref={inputRef} />
                </div>
                <div className="form-group">
                    <label for="address1">Street Address</label>
                    <input className="form-control" id="address1" name="address1" />
                </div>
                <div className="form-group">
                    <label for="address2">Apartment, unit, suite, or floor #</label>
                    <input className="form-control" id="address2" name="address2" />
                </div>
                <div className="form-group">
                    <label for="city">City</label>
                    <input className="form-control" id="locality" name="locality" />
                </div>
                <div className="row">
                    <div className="form-group col-6">
                        <label for="state">State/Province</label>
                        <input className="form-control" id="state" name="state" />
                    </div>
                    <div className="form-group col-6">
                        <label for="postcode">Postal code</label>
                        <input className="form-control" id="postcode" name="postcode" />
                    </div>
                </div>
                <div className="form-group">
                    <label for="placeID" >Place ID</label>
                    <input className="form-control" id="placeID" name="placeID" value={place.place_id} />
                </div>
            </form>
        </>
    );
};
export default LocationForm;
