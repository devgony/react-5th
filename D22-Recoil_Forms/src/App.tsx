import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { countriesState } from "./atoms";
import CountryItem from "./components/CountryItem";
import { CategoryMap, CategoryKey, CategoryNode } from "./category";
import { Fragment } from "react/jsx-runtime";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Error = styled.p`
  color: red;
`;

interface IFrom {
  country: string;
}

export default function App() {
  const { register, handleSubmit, reset, formState, setError } =
    useForm<IFrom>();
  const [countries, setCountries] = useRecoilState(countriesState);
  const onSubmit = (data: IFrom) => {
    if (countries.has(data.country)) {
      setError("country", {
        type: "manual",
        message: "Already exists",
      });

      return;
    }

    setCountries(
      new Map([...countries, [data.country, new CategoryNode("Wanted")]])
    );
    reset();
  };

  const getCountriesWith = (status: CategoryKey) => {
    return new Map(
      [...countries].filter(([_, value]) => value._key === status)
    );
  };

  return (
    <main>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>{CategoryMap.Wanted.description}</h2>
        <input {...register("country", { required: "Input is required" })} />
        <Error>{formState?.errors?.country?.message}</Error>
        <button type="submit">가자</button>
      </Form>
      {Object.entries(CategoryMap).map(([key, value], index) => (
        <Fragment key={index}>
          {index > 0 && <h2>{value.description}</h2>}
          {[...getCountriesWith(key as CategoryKey)].map(
            ([name, status], index) => (
              <CountryItem key={index} name={name} status={status} />
            )
          )}
        </Fragment>
      ))}
    </main>
  );
}
