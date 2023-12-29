import React, { useState } from 'react';
import './App.css'; // スタイルシートのインポート
import SocialMediaLinks from './components/SocialMediaLinks'; // ソーシャルメディアリンクのインポート
import WeatherWidget from './components/WeatherWidget'; // 天気予報コンポーネントのインポート
import BreakoutGame from './components/BreakoutGame'; // ブロック崩しゲームコンポーネントのインポート

function App() {
  const [content, setContent] = useState('weather'); // コンテンツの状態管理

  return (
    <div className="App">
      <header className="App-header">
        ヘッダーコンテンツ
      </header>
      <aside className="App-sidebar">
        <button onClick={() => setContent('weather')}>天気予報</button>
        <button onClick={() => setContent('game')}>ブロック崩しゲーム</button>
        {/* サイドバー内にソーシャルメディアリンクを配置 */}
        <SocialMediaLinks />
      </aside>
      <main className="App-content">
        {content === 'weather' && <WeatherWidget />}
        {content === 'game' && <BreakoutGame />}
      </main>
    </div>
  );
}

export default App;
