import './index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TParsedTeam } from './types';
import { TableRow } from './TableRow';
import { Loading } from './Loading'

export default function App () {
  const [data, setData] = useState<Array<Array<TParsedTeam> | null>>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const get = async () => {
      const leagues = [
        'premier-league',
        'bundesliga',
        'la-liga',
        'serie-a',
        'ligue-1',
      ];

      // const requestUrlBase = 'http://localhost:1338/api/cann-data';
      const requestUrlBase =
        'https://serene-headland-51052.herokuapp.com/api/cann-data';

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
            console.log('ERROR:', err);
            setIsError(true);
          }).finally(() => {
          setIsLoading(false)
        });
      } catch (err) {
        console.log('ERROR:', err);
        setIsError(true);
        setIsLoading(false)
      }
    };

    get();
  }, []);

  return (
    <div style={{ display: 'flex', padding: '5px' }}>
      {isLoading ? <Loading/> : data.map((league, i) => {
        return (
          <div style={{ padding: '5px', flexGrow: 1 }}>
            <div
              key={i + 100}
              style={{
                fontSize: '10px',
              }}
            >
              {league?.map((team, i) => (
                <TableRow team={team} key={i}/>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
