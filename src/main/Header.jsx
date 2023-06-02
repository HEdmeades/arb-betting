import {Link} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import apiKeysStatic from "../static/apiKeysStatic.json"
import bookmakersStatic from "../static/bookmakersStatic.json";

function Header() {

  const [apiKeyIndex, setApiKeyIndex] = useLocalStorage('API-KEY-INDEX', 0);
  const [activeBookmakers, setActiveBookmakers] = useLocalStorage('ACTIVE-BOOKMAKERS', []);

  return (
    <div style={{padding: '16px', borderBottom: '1px solid', width: '100%', marginBottom: '16px'}}>
      <h2>Shotgun Bros Pty Ltd</h2>
      <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/simulator">Simulator</Link>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">API Key</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={apiKeyIndex}
            label="API Key"
            onChange={(e) => setApiKeyIndex(e.target.value)}
          >
            {apiKeysStatic.map((k, index) => {
              return (
                <MenuItem value={index}>{k.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <FormGroup >
          {bookmakersStatic.map((bookmaker) => {
            return (
              <FormControlLabel  control={<Checkbox onChange={(e) => {
                if(activeBookmakers.includes(bookmaker)){
                  setActiveBookmakers((prevState) => {
                    const newState = structuredClone(prevState);

                    const index = newState.indexOf(bookmaker);
                    newState.splice(index, 1);

                    return newState;
                  })
                } else {
                  setActiveBookmakers((prevState) => {
                    const newState = structuredClone(prevState);

                    newState.push(bookmaker);
                    return newState;
                  })
                }
              }} checked={activeBookmakers.includes(bookmaker)}/>} label={bookmaker}/>
            )
          })}
        </FormGroup>
      </div>
    </div>
  )
}

export default Header