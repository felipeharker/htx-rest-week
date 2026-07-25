import React from 'react';

export default function ListView({ data }) {
  if (!data || data.length === 0) return <div className="font-mono text-gray-500">Loading data...</div>;

  return (
    <div className="flex flex-col space-y-4">
      {data.map((restaurant, idx) => (
        <div key={idx} className="border border-black p-4 md:p-6 bg-white flex flex-col hover:bg-gray-50 transition-colors">
          <h2 className="text-xl md:text-2xl font-bold font-serif mb-2">{restaurant['restaurant name']}</h2>
          <p className="font-mono text-sm text-gray-700">{restaurant['restaurant address']}</p>
        </div>
      ))}
    </div>
  );
}
