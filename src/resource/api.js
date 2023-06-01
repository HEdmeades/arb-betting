import axios from "axios";

export const getSportOdds = (sportId, apiKey) => axios.get(`https://api.the-odds-api.com/v4/sports/${sportId}/odds/?regions=au&markets=h2h&apiKey=${apiKey}`);