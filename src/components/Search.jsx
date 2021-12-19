import axios from "axios";
import React, { useState } from "react";
import {
  BehaviorSubject,
  debounceTime,
  delay,
  filter,
  from,
  map,
  switchMap,
  tap,
} from "rxjs";
import Card from "./Card";
import "./Search.css";

const Search = () => {
  const searchTerm = new BehaviorSubject(null);
  const [cards, setCards] = useState([]);
  searchTerm
    .pipe(
      filter(Boolean),
      debounceTime(1500),
      tap(() => setCards([])),
      switchMap((query) => {
        return from(
          axios.get(`https://api.scryfall.com/cards/search?q=${query}`)
        );
      }),
      map((response) => {
        const downloadedCards = response.data.data;
        if (downloadedCards.length < 1) {
          return null;
        }
        return downloadedCards.map((card) => {
          return {
            name: card.name,
            imageUrl: card?.image_uris?.normal || "",
            manaCost: card.mana_cost,
            cmc: card.cmc,
            text: card.oracle_text,
            type: card.type_line,
            power: card.power,
            toughness: card.toughness,
            colors: card.colors || card.color_identity,
            keywords: card.keywords,
            setName: card.set_name,
          };
        });
      }),
      filter(Boolean),
      // switchMap((c) => from(c)),
      delay(100),
      tap((ca) => {
        // let tmpCards = cards;
        // tmpCards.push(ca);
        setCards(ca);
      })
    )
    .subscribe();

  const renderedCards = cards.map((card) => {
    return <Card key={card.name} card={card}></Card>;
  });

  return (
    <>
      <div className="search-bar">
        <label className="search-bar__label">Search:</label>
        <input
          className="search-bar__input"
          type="text"
          onChange={(e) => searchTerm.next(e.target.value)}
        ></input>
        <a href="https://scryfall.com/docs/syntax">Search Syntax</a>
      </div>
      <div className="search-cards">{renderedCards}</div>
    </>
  );
};

export default Search;
