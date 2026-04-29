import { useNavigate, Link } from "react-router-dom";

export function Card({ title, img, id_post }) {
  const navigate = useNavigate();

  return (
    <Link to={"/blog/" + id_post}>
      <div
        className="card"
        style={{ cursor: "pointer" }}
      >
        {img && <img src={img} />}
        <h1>{title}</h1>
      </div>
    </Link>
  );
}