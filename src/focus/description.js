import React from "react";
import clsx from "clsx";


export default function Description (props) {
    const { className } = props;
    return (
        <div className={clsx("description", className)}>
            A random, gentle reminder to focus.
            <br/>
            Click anywhere to unpause.
        </div>
    );
}
