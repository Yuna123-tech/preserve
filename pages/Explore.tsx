
import React from 'react';
import Card from '../components/Card';
import { heritageSites } from '../constants';

const Explore: React.FC = () => {
  return (
    <div>
      <h2 className="font-display text-7xl text-center mb-10 text-green-600">우리나라 국가유산 탐험!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {heritageSites.map((site, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <img src={site.image} alt={site.name} className="w-full h-48 object-cover"/>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-display text-4xl text-gray-800">{site.name}</h3>
              <p className="text-lg text-gray-600 mt-2 flex-grow">
                <span className="font-bold text-green-700">{site.description.split('|')[0]}</span>
                {site.description.split('|')[1]}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Explore;
