import { useNavigate, Link } from "react-router-dom";

export function CardList({ entries, filteredText }) {
  const cards = entries
    .filter(entry =>
      entry.title.toLowerCase().includes(filteredText.toLowerCase())
    )
    .map(entry => (
      <Card
        key={entry.id_post}
        id={entry.id_post}
        img={entry.image}
        month={entry.title}
        description={entry.text}
      />
    ));

  return (
    <div className='card-list'>
      {cards}
    </div>
  );
}

export function Card ({id, img, month, description}) {
   return (
      <Link to={"/blog/" + id}>
        <div
          className="card"
          style={{ cursor: "pointer" }}
        >
          {img && <img src={"/src/assets/" + img} />}
        
          <h1>{month}</h1>
        </div>
      </Link>
  );
}