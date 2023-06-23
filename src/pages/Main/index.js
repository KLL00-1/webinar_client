import {useState, useEffect, useRef} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useLocation, useNavigate} from 'react-router';
import {v4} from 'uuid';

export default function Main() {
  // const history = useLocation();
  const [rooms, updateRooms] = useState([]);
  const navigate = useNavigate()
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
    <div ref={rootNode}>
      <h1>Available Rooms</h1>

      <ul>
        {rooms.map(roomID => (
          <li key={roomID}>
            {roomID}
            <button onClick={() => {
              navigate(`/room/${roomID}`);
            }}>JOIN ROOM</button>
          </li>
        ))}
      </ul>

      <button onClick={() => {
        navigate(`/room/${1}`);
      }}>Create New Room</button>
    </div>
  );
}