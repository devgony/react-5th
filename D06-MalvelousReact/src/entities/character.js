import md5 from "md5";

const publicKey = "6b8988c8b258883dee3baf8c1bff80c5";
const privateKey = "57b67370ed043472a288021af0d8a1b6920308a5";

export class Character {
  constructor(
    id,
    name,
    description,
    modified,
    thumbnail,
    resourceURI,
    comics,
    series,
    stories,
    events,
    urls
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.modified = modified;
    this.thumbnail = new Thumbnail(thumbnail.path, thumbnail.extension);
    this.resourceURI = resourceURI;
    this.comics = new Comics(
      comics.available,
      comics.collectionURI,
      comics.items
    );
    this.series = new Series(
      series.available,
      series.collectionURI,
      series.items
    );
    this.stories = new Stories(
      stories.available,
      stories.collectionURI,
      stories.items
    );
    this.events = new Events(
      events.available,
      events.collectionURI,
      events.items
    );
    this.urls = urls.map((url) => new URL(url.type, url.url));
  }

  static fromJson(json) {
    return new Character(
      json.id,
      json.name,
      json.description,
      json.modified,
      json.thumbnail,
      json.resourceURI,
      json.comics,
      json.series,
      json.stories,
      json.events,
      json.urls
    );
  }

  getImage() {
    return `${this.thumbnail.path}.${this.thumbnail.extension}`;
  }
}

export class Thumbnail {
  constructor(path, extension) {
    this.path = path;
    this.extension = extension;
  }
}

export class Comics {
  constructor(available, collectionURI, items) {
    this.available = available;
    this.collectionURI = collectionURI;
    this.items = items.map(
      (item) => new ComicItem(item.resourceURI, item.name)
    );
  }
}

export class ComicItem {
  constructor(resourceURI, name) {
    this.resourceURI = resourceURI;
    this.name = name;
  }

  async getImage() {
    try {
      const ts = Date.now();
      const params = new URLSearchParams({
        ts: ts,
        apikey: publicKey,
        hash: md5(ts + privateKey + publicKey),
      });
      const httpsURL = this.resourceURI.replace("http://", "https://");
      const url = `${httpsURL}?${params}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { path, extension } = data.data.results[0].thumbnail;
      return `${path}.${extension}`;
    } catch (error) {
      console.error("Failed to fetch image:", error);
      return null;
    }
  }
}

export class Series {
  constructor(available, collectionURI, items) {
    this.available = available;
    this.collectionURI = collectionURI;
    this.items = items.map(
      (item) => new SeriesItem(item.resourceURI, item.name)
    );
  }
}

export class SeriesItem {
  constructor(resourceURI, name) {
    this.resourceURI = resourceURI;
    this.name = name;
  }
}

export class Stories {
  constructor(available, collectionURI, items) {
    this.available = available;
    this.collectionURI = collectionURI;
    this.items = items.map(
      (item) => new StoryItem(item.resourceURI, item.name, item.type)
    );
  }
}

export class StoryItem {
  constructor(resourceURI, name, type) {
    this.resourceURI = resourceURI;
    this.name = name;
    this.type = type;
  }
}

export class Events {
  constructor(available, collectionURI, items) {
    this.available = available;
    this.collectionURI = collectionURI;
    this.items = items.map(
      (item) => new EventItem(item.resourceURI, item.name)
    );
  }
}

export class EventItem {
  constructor(resourceURI, name) {
    this.resourceURI = resourceURI;
    this.name = name;
  }
}

export class URL {
  constructor(type, url) {
    this.type = type;
    this.url = url;
  }
}
