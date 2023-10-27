import { useRef, useEffect } from "react";

const LocationForm = props => {
    const [task, setTask] = props.functions;

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    const options = {
        componentRestrictions: {
            country: ["us"]
        },
        fields: ["name", "place_id"],
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            const placeData = await autoCompleteRef.current.getPlace()
            setTask((previousTask) => ({ ...previousTask, gplaceID: placeData.place_id }))


            console.log(placeData)


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
                    <input className="form-control" id="placeID" name="placeID" value={task.gplaceID} />
                </div>
            </div>
        </>
    );
};

export default LocationForm;
