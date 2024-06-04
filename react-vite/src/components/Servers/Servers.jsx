import { useSelector, useDispatch } from "react-redux";
import { selectServer, getAllServersThunk, selectServer } from "../../redux/servers";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteServer from "../DeleteServerModal";
import { useNavigate } from 'react-router-dom';

function ServersList() {
  const dispatch = useDispatch();
  const servers = useSelector((state) => Object.values(state.server));
  const currentUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllServersThunk())
  }, [dispatch])

  const handleServerClick = (serverId) => {
    dispatch(selectServer(serverId));
    dispatch(selectServer(serverId));
    navigate(`/servers/${serverId}`);
    navigate(`/servers/${serverId}`);
  };
  return (
    <ul>

      {servers?.map((server) => (
        <li key={server.id} onClick={()=> handleServerClick(server.id)}>{server.name}</li>



      ))}


    </ul>


  );
}

export default ServersList;
