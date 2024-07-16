const AjaxPcPartsTableFilterableTable = () => {
    
    console.log("AjaxPcPartsTable running");
   
    // Tell React that 'items' (an array of objects) is a state variable 
    // that (when changed) should redisplay this component.
    // Set its initial value to [], an empty array.
    const [items, setItems] = React.useState([]);
    
    // Tell React that "error" is a state variable that (when changed) 
    // should redisplay this component. Set its initial value to null.
    const [error, setError] = React.useState(null);

    // useEffect 2nd parameter is an array of elements that 
    // (if any of those state variables change) should trigger the function specified 
    // as the 1st useEffect parameter. 
    // RUN ONCE PATTERN: If you put [] as 2nd param, it runs the 1st param (fn) once. 
    React.useEffect(() => {
        ajax_alt("json/pcparts.json",
            function (partsList) {        // success function gets obj already run thru JSON.
                setItems(partsList);
                setError("");
            },
            function (msg) {   // failure message gets error message
                setError(msg);
            }
        );
    }, []);
    
    return (
        <div>
            {error ? <div>Error: {error} </div> : <PcPartsFilterTable list={items} />}
        </div>
    );

}; // class AjaxUserTable