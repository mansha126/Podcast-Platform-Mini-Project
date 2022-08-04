import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Explore Podcasts</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="https://postlight.com/wp-content/uploads/2022/04/postlight-podcast-og.png?fit=1200%2C630"
              text="Postlight Podcast"
              label="Adventure"
              path="/services"
            />
            <CardItem
              src="https://m.media-amazon.com/images/M/MV5BNzdiMmRjY2MtZDZlYi00ZjdkLWExZTYtNmI3NzNlZjZjYzRmXkEyXkFqcGdeQXVyMDY3OTcyOQ@@._V1_FMjpg_UX1000_.jpg"
              text="The Tony Robbins Podcast"
              label="Luxury"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="https://wsum.org/wp-content/uploads/2018/11/sysk.jpg"
              text="Where Did Human Intelligence Come From?"
              label="Mystery"
              path="/services"
            />
            <CardItem
              src="https://www.iheartradio.ca/image/policy:1.14503652:1612385596/stuff-to-blow-your-mind.jpg?c=0%2C1320%2C2993%2C1680&$p$c=6eade18"
              text="Listener Mail: Beans and Babel"
              label="Adventure"
              path="/products"
            />
            <CardItem
              src="https://i.scdn.co/image/ab6765630000ba8aaa7b839426f105bfb657b55d"
              text="How to Focus | Shaila Catherine"
              label="Adrenaline"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
