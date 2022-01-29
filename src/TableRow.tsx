import { Fragment } from "react";
import { TParsedTeam } from "./types";

interface IProps {
  team: TParsedTeam;
}

export const TableRow: React.FC<IProps> = ({ team }) => {
  return (
    <tr>
      {team.map((t, i) => (
        <Fragment key={i + 50}>
          {i === 0 && <td>{t.points}</td>}
          {t.name && t.logo && <TeamCell name={t.name} logo={t.logo} />}
        </Fragment>
      ))}
    </tr>
  );
};

const TeamCell: React.FC<{ name: string; logo: string }> = ({ name, logo }) => {
  return (
    <td style={{ display: "flex", alignItems: "center" }}>
      <img style={{ height: "50px" }} src={logo} />
      <span>{name?.toUpperCase()}</span>
    </td>
  );
};
