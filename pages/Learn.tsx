import React from 'react';
import Card from '../components/Card.tsx';

const Learn: React.FC = () => {
    const learningPoints = [
        { title: "국가유산이란 무엇일까요?", content: "우리 조상들이 남겨주신 소중한 보물이에요. 옛날 건물, 책, 그림, 음악, 춤처럼 형태가 있는 것도 있고, 이야기나 기술처럼 형태가 없는 것도 있답니다.", color: "bg-blue-100" },
        { title: "왜 중요할까요?", content: "국가유산은 우리가 누구인지 알려주는 거울과 같아요. 조상들의 지혜와 역사를 배우고, 우리나라에 대한 자부심을 느낄 수 있게 해줘요.", color: "bg-green-100" },
        { title: "어떻게 지킬 수 있을까요?", content: "국가유산을 방문할 때는 조용히 하고, 쓰레기를 버리지 않아요. 만지거나 낙서하지 않고, 소중히 다루는 마음이 가장 중요해요. 친구들에게도 국가유산의 소중함을 알려주세요!", color: "bg-yellow-100" },
        { title: "우리가 바로 '미래의 국가유산 지킴이'!", content: "국가유산에 관심을 갖고 사랑하는 마음이 바로 국가유산을 지키는 첫걸음이에요. 여러분 한 명 한 명이 소중한 국가유산을 다음 세대에게 물려줄 수 있는 훌륭한 지킴이랍니다!", color: "bg-red-100" }
    ];
    return (
        <div>
          <h2 className="font-display text-7xl text-center mb-10 text-blue-600">차근차근 알아보기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{learningPoints.map((point, index) => (<Card key={index} className={point.color}><h3 className="font-display text-5xl text-gray-800 mb-4">{point.title}</h3><p className="text-xl leading-relaxed text-gray-700">{point.content}</p></Card>))}</div>
        </div>
    );
};

export default Learn;
