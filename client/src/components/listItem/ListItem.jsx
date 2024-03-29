import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";

export default function ListItem({ index, item }) {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});


  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("movies/find/" + item,
          { headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjkxM2ZiZjA4OGE1MDZlZTQ4YzM5MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTI4NDA0NSwiZXhwIjoxNjc1NzE2MDQ1fQ.ue92D6HFtLNqUR-aNiWekG2T_hG-kLhzQgOtZKYeGeI" } });

        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, [item])

  //const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  //src=https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee

  return (
    <Link to={{pathname:"/watch",movie:movie}}>
      <div
        className='listItem'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}>
        <img src={movie.img} alt="" />

        {isHovered && (

          <>
            <video src={movie.trailer} autoPlay={true} loop />

            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />

              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>

              </div>
              <div className="desc">
                {movie.desc}
              </div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
