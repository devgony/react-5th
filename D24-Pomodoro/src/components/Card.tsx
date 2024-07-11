import { motion } from "framer-motion";
import styled from "styled-components";

interface Props {
  value: number;
}

const WhiteCard = styled(motion.div)`
  background-color: white;
  color: black;
  width: 157px;
  height: 235px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 64px;
  font-weight: bold;
  color: #e44336;
`;

const padZero = (value: number) => (value < 10 ? `0${value}` : value);

const Card: React.FC<Props> = ({ value }: Props) => {
  return (
    <WhiteCard
      key={value}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      initial={{ scale: 0.8 }}
      animate={{ scale: [1, 0.8] }}
    >
      {padZero(value)}
    </WhiteCard>
  );
};

export default Card;
