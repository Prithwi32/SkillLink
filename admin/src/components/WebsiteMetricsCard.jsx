import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const metricsData = [
  { icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", end: 50000, text: "Total Sessions", color: "text-blue-600", bgColor: "bg-blue-100" },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", end: 1000, text: "Total Events", color: "text-green-600", bgColor: "bg-green-100" },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", end: 1000000, text: "Website Traffic", color: "text-purple-600", bgColor: "bg-purple-100", suffix: "+" },
];

const WebsiteMetricsCard = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-lg   border-4 border-transparent border-b-blue-700 border-r-blue-700 shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <div className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-3 rounded-full ${item.bgColor}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 ${item.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h2 className={`text-4xl font-bold ${item.color} `}>
                  {inView ? (
                    <CountUp className='text-blue-700'
                      end={item.end}
                      duration={2.5}
                      separator=","
                      suffix={item.suffix || ''}
                    />
                  ) : '0'}
                </h2>
                <p className="text-lg text-center text-blue-600">{item.text}</p>
              </div>
            </div>
            <div className={`h-1 w-full bg-gradient-to-r ${item.color.replace('text', 'from')}-500 ${item.color.replace('text', 'to')}-300`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteMetricsCard;

