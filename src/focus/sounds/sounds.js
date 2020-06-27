import Tone from "tone";
import gentleAlarm from "./gentle-alarm.mp3";
import holdYourHorses from "./hold-your-horses.mp3";


export const alarmSound = new Tone.Player({
    url: gentleAlarm,
    autostart: false,
    volume: 0.5,
}).toMaster();


export const pauseSound = new Tone.Player({
    url: holdYourHorses,
    autostart: false,
    volume: 0.5,
}).toMaster();
