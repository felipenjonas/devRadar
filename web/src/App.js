import React from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';


function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/48365582?s=460&u=4699412acb6474b6a3192764e094c4937307701a&v=4" alt="Felipe Jonas"/>
              <div className="user-info">
                <strong>Felipe Jonas</strong>
                <span>NodeJS, React e Python</span>
              </div>
            </header>
            <p>Estudante de bid data no Agronegócio</p>
            <a target="_blank" href="https://github.com/felipenjonas  ">Acessar perfil no Github</a>
          </li>
        </ul>


      </main>
    </div>
  );
}

export default App;
