import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [updateData, setUpdateData] = useState({ name: 'morpheus', job: 'zion resident' });
  const [showForm, setShowForm] = useState(false);
  const API_BASE_URL = 'https://reqres.in/api';
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, {
        name: 'morpheus',
        job: 'leader',
      });

      setUserData(response.data);
    } catch (error) {
      console.error('API Error:', error.response.data);
    }
  };

  const updateUser = async () => {
    try {
      // Validation: Only update if the job is 'zion resident'
      if (updateData.job === 'zion resident') {
        const response = await axios.put(`${API_BASE_URL}/users/2`, {
          name: updateData.name,
          job: updateData.job,
        });

        setUserData(response.data);
      } else {
        console.log('Invalid update. Job must be "zion resident".');
        // Handle invalid update (you may show an error message)
      }
    } catch (error) {
      console.error('API Error:', error.response.data);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation: Only create if the job is 'leader'
    if (updateData.job === 'leader') {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/2`, {
          name: updateData.name,
          job: updateData.job,
        });

        setUserData(response.data);
      } catch (error) {
        console.error('API Error:', error.response.data);
      }
    } else {
      console.log('Invalid create. Job must be "leader".');
      // Handle invalid create (you may show an error message)
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/users/2`);
      setUserData(null);
    } catch (error) {
      console.error('API Error:', error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Welcome to the Dashboard</h1>

              <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success me-2" onClick={() => setShowForm(true)}>
                  Add +
                </button>
                <button className="btn btn-warning me-2" onClick={updateUser}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={deleteUser}>
                  Delete
                </button>
              </div>

              {showForm && (
                <form className="user-form" onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateData.name}
                      onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="job" className="form-label">
                      Job:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateData.job}
                      onChange={(e) => setUpdateData({ ...updateData, job: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              )}

              {userData && (
                <div className="user-created mt-3">
                  <p>User created/updated:</p>
                  <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
