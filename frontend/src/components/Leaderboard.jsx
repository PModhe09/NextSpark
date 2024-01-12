import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch leaderboard data
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://nextspark-backend.onrender.com/events/weekly-leaderboard');
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchLeaderboardData();
  }, []);

  const handleRefresh = () => {
    // Set loading to true while refreshing
    setLoading(true);

    // Fetch leaderboard data
    fetchLeaderboardData();
  };

  return (
    <div className="leaderboard bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-l font-bold">🏆 Leaderboard 🏆</h2>
        
      </div>
      <button
          onClick={handleRefresh}
          disabled={loading}
          className={`text-white bg-blue-500 py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Refreshing...' : 'R'}
        </button>
      <ul>
        {leaderboardData.map((person, index) => (
          <li key={index} className="mb-4 p-2 bg-white rounded-md shadow-md">
            <div className="flex items-center">
              <div className="w-20 h-16 overflow-hidden rounded-full mr-4">
                <img
                  src={person.displayPicture}
                  alt={person.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{person.displayName}</p>
                <p className="text-gray-600">🌟 Score: {person.score}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
