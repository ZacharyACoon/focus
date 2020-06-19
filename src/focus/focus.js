import React, { useState } from "react";
import "./default.css";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Description from "./description";
import Timer from "./timer";
import { alarmSound, pauseSound } from "./sounds/sounds";
require("typeface-kranky/index.css");


const style = {
    root: {
        fontFamily: "Kranky",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        fontSize: 24,
        textAlign: "center",
        "& > *": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "1s opacity",
            "&.hidden": {
                opacity: 0,
            },
            letterSpacing: "0.1em",
        },
        "& > .timer": {
            fontSize: 48,
        },
        "& > .timer::after": {
            content: `"."`,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            bottom: "-100%",
            color: "transparent",
            transition: "color 0.5s ease, text-shadow 0.25s ease",
        },
        "& .timer.fraction::after": {
            color: "inherit",
        },
    },
}


Focus.defaultProps = {
    min: 3,
    max: 10,
    paused: false,
};

function Focus (props) {
    let [paused, setPause] = useState(true);
    const { classes, className } = props;
    return (
        <div
            className={clsx(classes.root, className)}
            onClick={() => {
                paused ? alarmSound.start() : pauseSound.start();
                setPause(!paused);
            }}
        >
            <Description className={ !paused ? "hidden" : ""}/>
            <Timer className={ paused ? "hidden" : ""} paused={paused} />
        </div>
    );
}

export default withStyles(style)(Focus);
