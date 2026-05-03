import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Author(){
  const { id_author } = useParams();
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/authors/' + id_author)
      .then(res => res.json())
      .then(data => setAuthor(data))
      .catch(error => console.log(error));
  }, [id_author]);

  return (
  <div className="post-container">
    <h1>{author?.name} {author?.last_name}</h1>
    <h2>{author?.date_of_birth}</h2>
    <h2>{author?.phone_number}</h2>
    <h2>{author?.email}</h2>
  </div>
  );
}