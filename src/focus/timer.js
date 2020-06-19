import React, { useState } from "react";
import useInterval from "./useInterval";
import clsx from "clsx";
import moment from "moment";
import { alarmSound, pauseSound } from "./sounds/sounds";

// moment.relativeTimeThreshold('ss', 60);
// moment.updateLocale('en', {
//     relativeTime: {
//         s: (number, withoutSuffix, key, isFuture) => `${number} seconds`,
//     }
// })


Timer.defaultProps = {
    min: 5,
    max: 15,
    paused: false,
};


export default function Timer (props) {
    const random = (min, max) => (Math.random() * (max - min) + min);
    const randomMinutes = (min, max) => random(min*60*1000, max*60*1000);
    let [timer, setTimer] = useState({now: 0, end: 0, fraction: false})
    const tick = () => {
        let { now, end, fraction} = timer;
        now = Date.now();
        if ( ! props.paused && now > end ) {
            if ( end ) {
                alarmSound.start();
                let playbackRate = random(75, 125) / 100;
                alarmSound.playbackRate = playbackRate;
                pauseSound.playbackRate = playbackRate;
            }
            end = now + randomMinutes(props.min, props.max);
        }
        fraction = Math.floor((now + 200) / 500) % 2 === 0;
        setTimer({now: now, end: end, fraction: fraction})
    }
    useInterval(tick, 100);
    const { className } = props;
    return (
        <div className={clsx("timer", className, timer.fraction ? "fraction" : "")}>
            {moment.duration(timer.end - timer.now).humanize()}
        </div>
    );
}
