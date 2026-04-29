import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Post(){
  const { id_post } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/posts/' + id_post)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id_post]);

  return(
  <div className="post-container">
    {post.image && <img src={"/src/assets/" + post.image} />}
    <h1>{post?.title}</h1>

    <h2>
      Escrito por:  
      <Link to={"/author/" + post?.id_author}>
        {post?.name} {post?.last_name}
      </Link>
    </h2>

    <p>{post?.text}</p>
  </div>
  );
}