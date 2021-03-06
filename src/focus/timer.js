import React from "react";
import clsx from "clsx";
import moment from "moment";
import { alarmSound, pauseSound } from "./sounds/sounds";
import { futureRandomMinutes, randomDecimal } from "./random";


// moment.relativeTimeThreshold('ss', 60);
// moment.updateLocale('en', {
//     relativeTime: {
//         s: (number, withoutSuffix, key, isFuture) => `${number} seconds`,
//     }
// })


class Timer extends React.Component {
    static defaultProps = {
        min: 3,
        max: 10,
    }

    constructor (props) {
        super(props);
        this.state = {
            now: Date.now(),
            end: futureRandomMinutes(props.min, props.max),
            fraction: false,
        }
        this.tick = this.tick.bind(this);
    }

    tick () {
        let { now, end, fraction } = this.state;
        now = Date.now()
        if ( now > end ){
            alarmSound.start();
            let playbackRate = randomDecimal(0.75, 1.25);
            alarmSound.playbackRate = playbackRate;
            pauseSound.playbackRate = playbackRate;
            end = futureRandomMinutes(this.props.min, this.props.max);
        }
        fraction = Math.floor((now+200) / 500) % 2 === 0;
        this.setState({now: now, end: end, fraction: fraction});
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        const { className } = this.props;
        return (
            <div className={clsx(className, this.state.fraction ? "fraction" : "")}>
                {moment.duration(this.state.end - this.state.now).humanize()}
            </div>
        );
    }
}


export default Timer;
