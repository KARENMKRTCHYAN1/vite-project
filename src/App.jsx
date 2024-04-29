import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "react-modal";

function App() {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [modal, setModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (posts) {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } else {
        console.log("Error");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    setPosts(posts.filter((post) => post.id !== postId));

    setModal(false);
  };

  const openModal = (postId) => {
    setPostId(postId);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleEdit = (post) => {
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
        <br />
        <button onClick={updatePost}>Update</button>
      </div>

      {posts.length > 0 ? (
        <ul className="row">
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <div className="button">
                <button onClick={() => openModal(post.id)}>Delete</button>
                <button onClick={() => handleEdit(post)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <Modal className="Modal" isOpen={modal} onRequestClose={closeModal}>
        <p>Are you sure you want to delete?</p>
        <div>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
