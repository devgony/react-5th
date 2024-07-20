import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

export default function Header() {
  const homeMatch = useMatch({
    path: "/",
  });
  const comingSoonMatch = useMatch({
    path: "/coming-soon",
  });
  const nowPlayingMatch = useMatch({
    path: "/now-playing",
  });
  return (
    <Items>
      <Item>
        <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
      </Item>
      <Item>
        <Link to="/coming-soon">
          COMMING SOON {comingSoonMatch && <Circle layoutId="circle" />}
        </Link>
      </Item>
      <Item>
        <Link to="/now-playing">
          NOW PLAYING {nowPlayingMatch && <Circle layoutId="circle" />}
        </Link>
      </Item>
    </Items>
  );
}
