import React from "react";

function Image({src}){
    return(
        <div className="h-100">
            <img src={src}className="object-fit-md-contain img-fluid" alt="..."></img>
        </div>
    )
}

export default Image