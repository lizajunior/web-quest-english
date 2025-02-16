import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Загружаем контент при первой загрузке страницы
    route();
    // Обрабатываем кнопки "Назад/Вперёд"
    window.addEventListener("popstate", route);
    return () => {
      window.removeEventListener("popstate", route);
    };
  }, []);

  const route = (event) => {
    if (event) event.preventDefault(); // Проверяем, есть ли event
    window.history.pushState({}, "", event?.target?.href || window.location.pathname);
    //?. – optional chaining, который защищает от ошибок, если event или target окажутся null или undefined.
    handleLocation();
  };
  

  const routes = {
      "/home": "/pages/main.html",
      "/about": "/pages/about.html",
      "/lorem": "/pages/lorem.html",
  };

  const handleLocation = async () => {
      const path = window.location.pathname;
      const route = routes[path] || routes[404];
      const html = await fetch(route).then((data) => data.text());
      document.getElementById("main-page").innerHTML = html;
  };

  window.onpopstate = handleLocation;
  window.route = route;

  handleLocation();

  return (
    <div className="App">
      {/* Навигационная панель с темной темой */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Переключить навигацию"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="/home" onClick={route} className="App-link">Home</a>
          <a href="/about" onClick={route} className="App-link">About</a>
          <a href="/lorem" onClick={route} className="App-link">Lorem</a>
        </div>
      </nav>

      {/* Разворачивающееся меню */}
      <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
        <div className="bg-dark p-4">
          <h5 className="text-body-emphasis h4">Меню сайта</h5>
          <span className="text-body-secondary">Всё доступное меню расположено горизонтально</span>
        </div>
      </div>

      {/* Контент страницы */}
      <header className="App-header">
        <div id="main-page" className="container mt-4"></div>
      </header>
    </div>
  );
}
export default App;
