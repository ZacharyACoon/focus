import React from "react";
import "./default.css";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Description from "./description";
import Timer from "./timer";
import { alarmSound, pauseSound } from "./sounds/sounds";
import { randomDecimal } from "./random";
require("typeface-kranky");


const style = {
    root: {
        position: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Kranky",
        fontSize: 24,
        textAlign: "center",
        "& input": {
            zIndex: 2,
        }
    },
    timer: {
        position: "relative",
        fontSize: 48,
        "&::after": {
            content: `"."`,
            position: "relative",
            // left: "50%",
            transform: "translate(-50%, -50%)",
            color: "transparent",
            transition: "color 0.5s ease, text-shadow 0.25s ease",
        },
        "&.fraction::after": {
            color: "inherit",
        },
    },
    clickDetect: {
        zIndex: 1,
        content: `"."`,
        position: "absolute",
        height: "100vh",
        width: "100vw",
    },
    inputs: {
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        padding: "0.5em",
        "& > * + *": { marginLeft: "0.5em", },
        "& > *": { marginRight: "0.5em", },
        alignItems: "center",
        "& .up::after": {
            content: `"v"`,
            display: "block",
            transform: "rotate(180deg)",
            userSelect: "none",
            fontSize: 18,
            padding: "0.5em",
        },
        "& .down::after": {
            content: `"v"`,
            display: "block",
            userSelect: "none",
            fontSize: 18,
            padding: "0.5em",
        }
    }
}


class Focus extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            paused: true,
            min: 3,
            max: 10,
        };
    }

    render () {
        const { classes, className } = this.props;
        return (
            <div className={clsx(classes.root, className)} >
                <div
                    className={classes.clickDetect}
                    onClick={(event) => {
                        if ( this.state.paused ) {
                            let playbackRate = randomDecimal(0.75, 1.25);
                            alarmSound.playbackRate = playbackRate;
                            pauseSound.playbackRate = playbackRate;
                            alarmSound.start();
                        } else {
                            pauseSound.start();
                        }
                        this.setState({paused: !this.state.paused});
                    }}
                />
                {this.state.paused
                    ?
                    <React.Fragment>
                        <div>
                            A gentle reminder to focus occurring randomly between every
                        </div>
                        <div className={classes.inputs}>
                            <div className="min">
                                <div className="up" onClick={(event) => this.setState({min: Math.min(this.state.min + 1, this.state.max - 1)})}/>
                                <div className="value">{this.state.min}</div>
                                <div className="down" onClick={(event) => this.setState({min: Math.max(this.state.min - 1, 1)})}/>
                            </div>
                            and
                            <div className="max">
                                <div className="up" onClick={(event) => this.setState({max: Math.min(this.state.max + 1, 60)})}/>
                                <div className="value">{this.state.max}</div>
                                <div className="down" onClick={(event) => this.setState({max: Math.max(this.state.max - 1, this.state.min + 1)})}/>
                            </div>
                            minutes.
                        </div>
                        <div>click anywhere to pause / unpause</div>
                    </React.Fragment>
                    :
                    <Timer className={classes.timer} min={this.state.min} max={this.state.max}/>
                }
            </div>
        );
    }
}

export default withStyles(style)(Focus);
