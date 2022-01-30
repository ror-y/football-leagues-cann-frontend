import { Fragment } from 'react';
import { TParsedTeam } from './types';

interface IProps {
  team: TParsedTeam;
}

export const TableRow: React.FC<IProps> = ({ team }) => {
  return (
    <div style={{
      background: team[ 0 ].name ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '1px 0',
    }}>
      <div style={{ display: 'flex' }}>
        {team.map((t, i) => (
          <Fragment key={i + 50}>
            {i === 0 && <td style={{ padding: '0 30px' }}>{t.points}</td>}
            {t.name && t.logo && <TeamCell name={t.name} logo={t.logo}/>}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const TeamCell: React.FC<{ name: string; logo: string }> = ({ name, logo }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img style={{ height: '14px', marginRight: '10px' }} src={logo}/>
      <span style={{ marginRight: '10px' }}>{name}</span>
    </div>
  );
};
