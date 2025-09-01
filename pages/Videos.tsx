import React, { useState } from 'react';
import { videoData } from '../constants.ts';

const Videos: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-display text-7xl text-center mb-10 text-purple-600">영상으로 만나는 국가유산</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {videoData.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => setSelectedVideoId(video.id)}
          >
            <div className="relative">
              <img src={video.thumbnail} alt={video.title} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-sans font-bold text-lg text-gray-800 truncate">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedVideoId && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedVideoId(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow-2xl relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-w-16 aspect-h-9">
               <iframe
                key={selectedVideoId}
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <button
              onClick={() => setSelectedVideoId(null)}
              className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;