import React, { useState, useEffect } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  /*
    input de texto irá receber como parametro uma string vazia
    Após adicionar o value, e o onChange nos inputs, a partir disso
    armazenamos todas as informações dos formulários em variaveis de estado
    do nosso componente, E agora quando formos utilizar essas variáveis
    dentro de um submit eu tenho acesso em Real time do que
    o usuário digitar.
    Para isso criar outra função a ser disparada quando ele clickar (handleAddDev) adiciona os devs na api. 
  */
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [github_username, setGithub_username] = useState('')
  const [techs, setTechs] = useState('')

  const [devs, setDevs] = useState([]);

  // Busca latitude  longitude por geolocalização automático.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position)
        const { latitude, longitude } = position.coords

        setLatitude(latitude);
        setLongitude(longitude);

      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  // Busca os devs no banco para listar na página.
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])


  async function handleAddDev(event) {
    event.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithub_username('');
    setTechs('');

    // precisa copiar todos os devs dentor do array e adcionar o novo quando ele é criado;
    setDevs([...devs, response.data]);
    // console.log(response.data);
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={event => setGithub_username(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={event => setTechs(event.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                value={latitude}
                // armazenar o valor do imput no valor do estado (useState)
                onChange={event => setLatitude(event.target.value)}
                name="latitude"
                id="latitude"
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                value={longitude}
                onChange={event => setLongitude(event.target.value)}
                name="longitude"
                id="longitude"
                required
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => {
            return (
              <li key={dev._id} className="dev-item">
                <header>
                  <img src={dev.avatar_url} alt={dev.name} />
                  <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                  </div>
                </header>
                <p>{dev.bio}</p>
                <a target="_blank" href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
              </li>
            )
          }
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
