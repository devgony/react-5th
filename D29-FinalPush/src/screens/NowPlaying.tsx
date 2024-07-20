import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, makeImagePath } from "../api";
import MoviesGrid from "../components/MoviesGrid";

export default function NowPlaying() {
  const { isLoading, data } = useQuery(["getNowPlaying"], getNowPlaying);

  return <MoviesGrid movies={data?.results ?? []} />;
}
