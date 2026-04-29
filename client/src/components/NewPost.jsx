import { useState } from "react";

export default function NewPost(){
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [idAuthor, setIdAuthor] = useState('');
  const [img, setImg] = useState(null);

  function handleFile(e){
    const fileInfo = {
      file: e.target.files[0],
      filename: e.target.files[0].name
    };
    setImg(fileInfo);
  }

  function handleSubmit(){
    const formInfo = new FormData();
    formInfo.append('title', title);
    formInfo.append('text', text);
    formInfo.append('id_author', idAuthor);
    formInfo.append('img', img.file, img.filename);

    fetch(import.meta.env.VITE_API_URL + '/posts/new', {
      method: "POST",
      body: formInfo,
    })
    .then(() => {
      alert("Post agregado");
    })
    .catch((error) => console.log(error));
  }

  return(
    <div className="post-container">
      <div className="form">

        <label>Título</label>
        <input 
          type='text' 
          value={title} 
          onChange={(e)=>setTitle(e.target.value)} 
        />

        <label>Contenido</label>
        <textarea 
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />

        <label>ID Autor</label>
        <input 
          type='number'
          value={idAuthor}
          onChange={(e)=>setIdAuthor(e.target.value)}
        />

        <label>Imagen</label>
        <input 
          type='file' 
          onChange={handleFile} 
        />

        <button onClick={handleSubmit}>
          Agregar
        </button>

      </div>
    </div>
  );
}