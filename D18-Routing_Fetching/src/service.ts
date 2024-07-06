export interface Character {
  id: number;
  name: string;
  imageUrl: string;
}

export interface CharacterDetail {
  id: number;
  name: string;
  imageUrl: string;
  films: string[];
  sourceUrl: string;
}

export const getCharacters = async (): Promise<Character[]> =>
  fetch("https://disney_api.nomadcoders.workers.dev/characters").then((res) =>
    res.json().then((x) => x.slice(0, 99))
  );

export const getCharacterDetail = async (
  id: string
): Promise<CharacterDetail> =>
  fetch(`https://disney_api.nomadcoders.workers.dev/characters/${id}`).then(
    (res) => res.json()
  );
