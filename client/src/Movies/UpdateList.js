import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

// const initialItem = {
//     id: '',
//     title: '',
//     director: '',
//     metascore: '',
//     stars: []
// };

const UpdateList = props => {
  const { id } = useParams();
  const [item, setItem] = useState({ id });
  console.log("props.match.params.id", props.match.params.id);

  useEffect(() => {
    const itemToUpdate = props.movies.find(thing => `${thing.id}` === id);

    if (itemToUpdate) {
      setItem(itemToUpdate);
    }
  }, [props.movies, id]);

  //   const changeHandler = ev => {
  //     ev.persist();
  //     let value = ev.target.value;
  //     setItem({ ...item, [ev.target.name]: value });
  //   };

  const changeHandler = ev => {
    setItem({
      ...item,
      [ev.target.name]: ev.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // const formattedMovie = {
    //   ...item,
    //   id: id,
    //   stars: item.stars
    //   // stars: item.stars.join(", ")
    // };

    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        id: id,
        title: item.title,
        director: item.director,
        metascore: Number(item.metascore),
        stars: [item.stars]
      })
      .then(res => {
        console.log(res);
        //document.querySelector("form").reset();
        //setItem(formattedMovie);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Item</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={changeHandler}
        />
        <label>Director</label>
        <input
          type="text"
          name="director"
          value={item.director}
          onChange={changeHandler}
        />
        <label>Meta Score</label>
        <input
          type="text"
          name="metascore"
          value={item.metascore}
          onChange={changeHandler}
        />
        <label>Stars</label>
        <input
          type="text"
          name="stars"
          value={item.stars}
          onChange={changeHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateList;
