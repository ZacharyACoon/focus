export const random = (min, max) => (Math.random() * (max - min) + min);
export const randomDecimal = (min, max) => random(min*100, max*100) / 100;
export const randomMinutes = (min, max) => random(min*60*1000, max*60*1000);
export const futureRandomMinutes = (min, max) => Date.now() + randomMinutes(min, max);
