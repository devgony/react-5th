import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../api";
import MoviesGrid from "../components/MoviesGrid";

export default function Home() {
  const { isLoading, data } = useQuery(["getPopular"], getPopular);

  return <MoviesGrid movies={data?.results ?? []} />;
}
