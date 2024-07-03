export class Db {
  constructor() {
    this.authors = {
      "j-k-rowling": {
        authorName: "J. K. Rowling",
        books: {
          "harry-potter-and-the-philosophers-stone": {
            bookName: "Harry Potter and the Philosopher's Stone",
            chapters: [
              "The Body Who Lived",
              "The Vanishing Glass",
              "The Letters from No One",
              "The Keeper of the Keys",
              "Diagon Alley",
              "The Journey from Platform Nine and Three-Quarters",
              "The Sorting Hat",
              "The Potions Master",
              "The Midnight Duel",
              "Hallowe'en",
              "Quidditch",
              "The Mirror of Erised",
              "Nicholas Flamel",
              "Norbert the Norwegian Ridgeback",
              "The Forbidden Forest",
              "Through the Trapdoor",
              "The Man with Two Faces",
            ],
            characters: [
              "Harry Potter",
              "Hermione Granger",
              "Ron Weasley",
              "Dumbledore",
            ],
          },
          "harry-potter-and-the-chamber-of-secrets": {
            bookName: "Harry Potter and the Chamber of Secrets",
            chapters: [
              "The Worst Birthday",
              "Dobby's Warning",
              "The Burrow",
              "At Flourish and Blotts",
              "The Whomping Willow",
              "Gilderoy Lockhart",
              "Mudbloods and Murmurs",
              "The Deathday Party",
              "The Writing on the Wall",
              "The Rogue Bludger",
              "The Duelling Club",
              "The Polyjuice Potion",
              "The Very Secret Diary",
              "Cornelius Fudge",
              "Aragog",
              "The Chamber of Secrets",
              "The Heir of Slytherin",
              "Dobby's Reward",
            ],
            characters: [
              "Harry Potter",
              "Hermione Granger",
              "Ron Weasley",
              "Tom Riddle",
            ],
          },
        },
      },

      "j-r-r-tolkien": {
        authorName: "J. R. R. Tolkien",
        books: {
          "the-hobbit": {
            bookName: "The Hobbit",
            chapters: [
              "An Unexpected Party",
              "Roast Mutton",
              "A Short Rest",
              "Over Hill and Under Hill",
              "Riddles in the Dark",
              "Out of the Frying-Pan into the Fire",
              "Queer Lodgings",
              "Flies and Spiders",
              "Barrels Out of Bond",
              "A Warm Welcome",
              "On the Doorstep",
              "Inside Information",
              "Not at Home",
              "Fire and Water",
              "The Gathering of the Clouds",
              "A Thief in the Night",
              "The Clouds Burst",
              "The Return Journey",
              "The Last Stage",
            ],
            characters: ["Bilbo Baggins", "Gandalf", "Thorin Oakenshield"],
          },
          "the-lord-of-the-rings": {
            bookName: "The Lord of the Rings",
            chapters: [
              "Prologue",
              "Concerning Hobbits",
              "Concerning Pipeweed",
              "Of the Ordering of the Shire",
              "Of the Finding of the Ring",
              "Note on the Shire Records",
              "Ancient History",
              "The Tale of Years",
              "The Great Years",
              "Bilbo's Last Song",
            ],
            characters: ["Frodo Baggins", "Samwise Gamgee", "Gandalf"],
          },
        },
      },
    };
  }

  getAuthors() {
    return Object.entries(this.authors).map(
      ([authorSlug, { authorName, books }]) => ({
        authorSlug,
        authorName,
        books: Object.entries(books).map(([bookSlug, { bookName }]) => ({
          bookSlug,
          bookName,
        })),
      })
    );
  }

  getAuthorName(authorSlug) {
    return this.authors[authorSlug].authorName;
  }

  getBooks(authorSlug) {
    return Object.entries(this.authors[authorSlug]?.books).map(
      ([bookSlug, { bookName }]) => ({
        bookSlug,
        bookName,
      })
    );
  }

  getBookName(authorSlug, bookSlug) {
    return this.authors[authorSlug].books[bookSlug].bookName;
  }

  getChapters(authorSlug, bookSlug) {
    return this.authors[authorSlug].books[bookSlug].chapters;
  }

  getCharacters(authorSlug, bookSlug) {
    return this.authors[authorSlug].books[bookSlug].characters;
  }
}

export default new Db();
