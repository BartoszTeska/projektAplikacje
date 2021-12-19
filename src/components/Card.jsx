import "./Card.css";
const Card = ({ card }) => {
  const COLORS = {
    W: { background: "#F7F2E6", border: "#F8E5A5" },
    B: { background: "#A3918E", border: "#140D0B" },
    U: { background: "#A4BFD3", border: "#1B5599" },
    R: { background: "#EF9270", border: "#D2181D" },
    G: { background: "#B8D5B0", border: "#11732E" },
    undefined: { background: "#C9CCD5", border: "#93B5C6" },
  };
  const style = {
    backgroundColor: COLORS[card.colors[0]].background,
    border: `2px solid ${COLORS[card.colors[0]].border}`,
  };
  return (
    <div className="card-profile" style={style}>
      <img
        src={card.imageUrl}
        alt={card.name}
        width="237px"
        height="330px"
        className="card-image"
      ></img>
      <div className="card-profile-text">
        <h1>
          {card.name} {card.manaCost}
        </h1>
        <h2>{card.setName}</h2>
        <p>{card.type}</p>
        <div className="card-profile-text__keywords">
          {card.keywords.map((keyword) => (
            <p key={keyword}>{keyword}</p>
          ))}
        </div>
        <p className="card-profile-text__rules">{card.text}</p>
        {card.power && card.toughness && (
          <p className="card-profile-text__stats">
            {card.power}/{card.toughness}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
