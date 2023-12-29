import React, { useState, useEffect } from 'react';
const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/060000.json';
      try {
        const response = await fetch(url);
        const data = await response.json();
        const yamagataWeather = data.find(item => item.publishingOffice === '山形地方気象台');
        setWeatherData(yamagataWeather);
        setLoading(false);
      } catch (err) {
        console.error('Weather API fetching error:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
  };

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>エラーが発生しました: {error.message}</p>;
  }

  if (!weatherData) {
    return <p>天気情報が利用できません。</p>;
  }

  return (
    <div>
      <h2>山形県の天気予報</h2>
      {weatherData.timeSeries[0].areas.map(area => (
        <div key={area.area.code}>
          <h3>{area.area.name}</h3>
          {area.weathers.map((weather, index) => {
            const tempArea = weatherData.timeSeries[2]?.areas.find(a => a.area.code === area.area.code);
            const temp = tempArea?.temps[index];
            return (
              <p key={index}>
                日時: {formatDate(weatherData.timeSeries[0].timeDefines[index])}, 天気: {weather}
                {temp ? `, 気温: ${temp}℃` : ''}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WeatherWidget;
