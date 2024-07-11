import styled from "styled-components";
import Card from "./components/Card";
import { useRecoilState } from "recoil";
import {
  goalState,
  intervalIdState,
  remainingSecondsState,
  roundState,
} from "./atoms";
import {
  ArrowPathIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useMemo } from "react";
import { INIT_SECONDS, LAST_GOAL, LAST_ROUND } from "./const";
import { motion } from "framer-motion";
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background-color: #e44336;
  width: 500px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const Row = styled.div<{ height?: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: ${(prop) => prop.height ?? 0}px;
`;

const H1 = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const SizedBox = styled.div<{ height: string }>`
  height: ${(prop) => prop.height};
`;

const intoMinutes = (seconds: number) => Math.floor(seconds / 60);
const intoSecondsRemainder = (seconds: number) => seconds % 60;
export default function App() {
  const [remainingSeconds, setRemainingTime] = useRecoilState(
    remainingSecondsState
  );
  const [intervalId, setIntervalId] = useRecoilState(intervalIdState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);

  const start = () => {
    if (intervalId) {
      throw new Error("Interval ID is not null");
    }
    const id = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => {
    if (remainingSeconds === 0) {
      pause();
      setRemainingTime(INIT_SECONDS);
      setRound((prev) => prev + 1);
    }
  }, [remainingSeconds]);

  useEffect(() => {
    if (round === LAST_ROUND) {
      setRound(0);
      setGoal((prev) => prev + 1);
    }
  }, [round]);

  const pause = () => {
    if (!intervalId) {
      throw new Error("Interval ID is null");
    }
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    setRemainingTime(INIT_SECONDS);
    setRound(0);
    setGoal(0);
  };

  const renderIcon = (hasIntervalId: boolean, isLastGoal: boolean) => {
    if (!hasIntervalId && isLastGoal) {
      return <ArrowPathIcon width={96} onClick={reset} />;
    } else if (!hasIntervalId && !isLastGoal) {
      return <PlayCircleIcon width={96} onClick={start} />;
    } else {
      return <PauseCircleIcon width={96} onClick={pause} />;
    }
  };

  const buttonVariants = {
    hover: { scale: 1.5 },
    click: { scale: 1 },
  };

  return (
    <Main>
      <Column>
        <H1>Pomodoro</H1>
        <Row>
          <Card value={intoMinutes(remainingSeconds)} />
          <H1>：</H1>
          <Card value={intoSecondsRemainder(remainingSeconds)} />
        </Row>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="click"
        >
          {renderIcon(Boolean(intervalId), goal === LAST_GOAL)}
        </motion.div>
        <Row height={96}>
          <Column>
            <p>
              {round}/{LAST_ROUND}
            </p>
            <p>ROUND</p>
          </Column>
          <Column>
            <p>
              {goal}/{LAST_GOAL}
            </p>
            <p>GOAL</p>
          </Column>
        </Row>
      </Column>
    </Main>
  );
}
