import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import axios from "axios";
import "./home.scss"

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);


  useEffect(() => {
    const getRandomLists = async () => {
      try {

        const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          { headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjkxM2ZiZjA4OGE1MDZlZTQ4YzM5MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTI4NDA0NSwiZXhwIjoxNjc1NzE2MDQ1fQ.ue92D6HFtLNqUR-aNiWekG2T_hG-kLhzQgOtZKYeGeI" } });

        setLists(res.data);
        //console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomLists();
  }, [genre, type])

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list)=>(
        
        <List list={list}/>
        
      ))}


    </div>
  );
};

export default Home;
