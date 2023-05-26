import round from "./round";


export const toMoneyString=(val) => "$"+ round(val, 2);
export const toPercentString=(val) => round(val * 100, 2) + "%";