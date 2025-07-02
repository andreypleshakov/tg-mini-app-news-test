import { useEffect, useState } from "react";
import "./App.css";

import account from "./assets/account.svg";
import share from "./assets/share.svg";
import settings from "./assets/settings.svg";

export type NewsItem = {
  id: string;
  caption: string;
  imagePath: string;
  userId: number;
  createdAt: string;
};

const apiBase = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    fetch(`${apiBase}/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        <div className="left-icons">
          <img className="icon" src={account} />
          <img className="icon" src={settings} />
        </div>
        <img className="icon" src={share} />
      </div>

      <div className="content-wrapper">
        {loading && <p>Загрузка...</p>}
        {!news && !loading && <p>Нет новостей</p>}

        {news && (
          <div className="main">
            <div className="news-content">
              <img
                className="news-image"
                src={`http://localhost:3000${news.imagePath}`}
                alt={news.caption}
              />
              <p className="caption">{news.caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
