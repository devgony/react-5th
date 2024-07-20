import { useQuery } from "@tanstack/react-query";
import { getComingSoon, makeImagePath } from "../api";
import MoviesGrid from "../components/MoviesGrid";

export default function ComingSoon() {
  const { data } = useQuery(["getComingSoon"], getComingSoon);

  return <MoviesGrid movies={data?.results ?? []} />;
}
