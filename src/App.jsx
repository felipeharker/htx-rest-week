import React, { useState, useEffect } from 'react';
import MapView from './MapView';
import ListView from './ListView';
import restaurantsData from './restaurants.json';

function App() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'map'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // sort alphabetically by name
    const sorted = [...restaurantsData].sort((a, b) => a['restaurant name'].localeCompare(b['restaurant name']));
    setData(sorted);
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col space-y-4 mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif pb-2 leading-tight">HTX Restaurant Week 2026</h1>
          <div className="flex space-x-4 border-b border-black pb-2">
            <button
              className={`font-serif text-xl ${activeTab === 'list' ? 'font-bold underline' : 'hover:opacity-70'}`}
              onClick={() => setActiveTab('list')}
            >
              List View
            </button>
            <button
              className={`font-serif text-xl ${activeTab === 'map' ? 'font-bold underline' : 'hover:opacity-70'}`}
              onClick={() => {
                setActiveTab('map');
                setSelectedRestaurant(null); // Reset selection when switching to map
              }}
            >
              Map View
            </button>
          </div>
        </header>

        <section>
          {activeTab === 'list' ? (
            <ListView data={data} />
          ) : (
            <MapView
              data={data}
              selectedRestaurant={selectedRestaurant}
              onSelectRestaurant={setSelectedRestaurant}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
