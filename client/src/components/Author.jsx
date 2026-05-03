import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Author(){
  const { id_author } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/authors/' + id_author)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setAuthor(data))
      .catch(error => console.log('AUTHOR ERROR:', error));
  }, [id_author]);

  if (!author) return <h1>Cargando...</h1>;

  return (
    <div className="post-container">
      <h1>{author.name} {author.last_name}</h1>
      <h2>{author.date_of_birth}</h2>
      <h2>{author.phone_number}</h2>
      <h2>{author.email}</h2>
    </div>
  );
}