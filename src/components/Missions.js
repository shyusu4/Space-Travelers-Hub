import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMissions } from '../redux/missions/missions';
import MissionItem from './MissionItem';
import './Missions.css';

function Missions() {
  const missions = useSelector((state) => state.missionsReducer.missions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!missions.length) {
      dispatch(getMissions());
    }
  }, [dispatch]);

  return (
    <table className="missions-table">
      <thead>
        <tr className="mission-header">
          <th>Mission</th>
          <th>Description</th>
          <th>Status</th>
          <th>{}</th>
        </tr>
      </thead>
      <tbody>
        {missions.map((mission) => (
          <MissionItem
            id={mission.id}
            key={mission.id}
            name={mission.name}
            reserved={mission.reserved}
            description={mission.description}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Missions;
