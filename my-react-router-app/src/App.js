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

  function route(event) {
    if (event) {
      event.preventDefault(); // Предотвращаем стандартный переход
      window.history.pushState({}, "", event.target.href); // Меняем URL
    }

    // Получаем текущий путь
    const path = window.location.pathname;

    // Обновляем контент на странице
    const mainPage = document.getElementById("main-page");

    // Обработчик маршрутов (роутинг)
    switch (path) {
      case "/about":
        mainPage.innerHTML = `
          <h1>О нас</h1>
          <p>Здесь рассказываем о компании и её деятельности.</p>
        `;
        break;
      case "/lorem":
        mainPage.innerHTML = `
          <h1>Lorem Ipsum</h1>
          <p>Пример текста, чтобы проверить работу роутинга.</p>
        `;
        break;
      case "/home":
      case "/":
        mainPage.innerHTML = `
          <h1>Главная</h1>
          <p>Добро пожаловать на сайт!</p>
        `;
        break;
      default:
        mainPage.innerHTML = `
          <h1>Ошибка 404</h1>
          <p>Страница не найдена!</p>
        `;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <a href="/home" onClick={route} className="App-link">Home</a>
          <a href="/about" onClick={route} className="App-link">About</a>
          <a href="/lorem" onClick={route} className="App-link">Lorem</a>
        </nav>
        <div id="main-page" className="container mt-4"></div>
      </header>
    </div>
  );
}

export default App;

