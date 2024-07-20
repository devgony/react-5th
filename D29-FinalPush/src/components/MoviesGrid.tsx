import {
  AnimatePresence,
  motion,
  useScroll,
  useViewportScroll,
} from "framer-motion";
import styled from "styled-components";
import { makeImagePath, Movie } from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  min-width: 400px;
  max-width: 800px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: lightgrey;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
  color: white;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  justify-content: center;
  background-color: #f0f0f0;
`;

interface Props {
  movies: Movie[];
}

export default function MoviesGrid({ movies }: Props) {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");
  const { scrollY } = useScroll();
  const clickedMovie = movieId && movies.find((movie) => movie.id === +movieId);

  return (
    <Grid>
      <AnimatePresence>
        {movies.map(({ id, poster_path, title }) => (
          <Link to={`/movies/${id}`} key={id}>
            <motion.img
              src={makeImagePath(poster_path)}
              width={100}
              layoutId={id.toString()}
            />
            <h2>{title}</h2>
          </Link>
        ))}
        {movieId ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={movieId}>
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Grid>
  );
}
