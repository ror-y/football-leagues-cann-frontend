import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { TParsedTeam } from "./types";
import { TableRow } from "./TableRow";

export default function App() {
  const [data, setData] = useState<Array<Array<TParsedTeam> | null>>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const get = async () => {
      const leagues = [
        "premier-league",
        // "bundesliga",
        // "la-liga",
        // "serie-a",
        // "ligue-1",
      ];

      const requestUrlBase = "http://localhost:1338/api/cann-data";

      try {
        axios
          .all(
            leagues.map((league) => axios.get(`${requestUrlBase}/${league}`))
          )
          .then(
            axios.spread((...responses) => {
              setIsError(false);
              responses.forEach((r) => {
                setData((prv) => [...prv, r.data]);
              });
            })
          )
          .catch((err) => {
            console.log("ERROR:", err);
            setIsError(true);
          });
      } catch (err) {
        console.log("ERROR:", err);
        setIsError(true);
      }
    };

    get();
  }, []);

  return (
    <div className="App">
      <table>
        {data.map((league, i) => {
          return (
            <tbody
              key={i + 100}
              style={{
                fontSize: "30px",
              }}
            >
              {league?.map((team, i) => (
                <TableRow team={team} key={i} />
              ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
