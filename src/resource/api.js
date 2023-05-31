import axios from "axios";

export const getSportOdds = (sportId) => axios.get(`https://api.the-odds-api.com/v4/sports/${sportId}/odds/?regions=au&markets=h2h&apiKey=40defe04b08ef2cd75a3d8ea7143b7a5`);