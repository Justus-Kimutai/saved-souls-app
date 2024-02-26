import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [village, setVillage] = useState('');
  const [loading, setLoading] = useState(false);

  const backEndURL = process.env.BACKENDURL;

  const handleSubmit = async () => {
    if (loading) {
      return; // Prevent multiple clicks when loading
    }
    setLoading(true)

    if (!name || !phone || !region || !village) {
      alert('Fields cannot be empty');
      return;
    }

    try {
      await fetch(`${backEndURL}/save-soul`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, region, village }),
      });

      // Clear input fields after submission
      setName('');
      setPhone('');
      setRegion('');
      setVillage('');

      // Fetch and update the posts list
      fetchPosts();
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backEndURL}/get-saved`);
      const postsData = await response.json();
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="logo">
        <img src="Logo.png" alt="" />
      </div>

      <h1 className="title">KSUCU-MC</h1>
      <h3 className="title-sub">MISSION DEPARTMENT</h3>

      <div className="flex">
        <form className="row" id='postForm'>
          <h2 className="sub-title">Add a Soul</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />

          <label htmlFor="village">Village:</label>
          <input
            type="text"
            id="village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            required
          />

          <button type="button" className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
          </button>

        </form>

        <div className="row">
          <h2 className="won-souls">Won Souls</h2>
          <div id="postsList">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td>{post.name}</td>
                    <td>{post.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


