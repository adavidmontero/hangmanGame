import React, { useEffect, useState, useRef, Fragment } from 'react';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Floors from './components/Floors';
import Attemps from './components/Attemps';
import Result from './components/Result';
import './index.css';

function App() {

  //Estado para el teclado de letras
  //eslint-disable-next-line
  const [letters, setLetters] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                                          'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                                          'V', 'W', 'X', 'Y', 'Z']);
  
  //Estado para saber si el usuario esta jugando o no
  const [isPlaying, setIsPlaying] = useState(false);
  //Estado que contendrá la palabra a adivinar (libre de espacios, tildes, y caracteres especiales)
  const [word, setWord] = useState([]);
  //Estado que contendrá las letras seleccionadas por el usuario y están en la palabra a adivinar
  const [userLetters, setUserLetters] = useState([]);
  //Estado que contiene los intentos del usuario
  const [attemps, setAttemps] = useState(9);
  //Estado para saber si el juego terminó
  const [isGameOver, setIsGameOver] = useState(false);
  //Estado para mostrar el modal
  const [showModal, setShowModal] = useState(false);
  //Estado de la palabra ingresada por el usuario
  const [wordUser, setWordUser] = useState('');
  //Estado que espera la palabra a descubrir
  const [isLoading, setIsLoading] = useState(false);
  //Estado para saber si se rindió
  const [surrender, setSurrender] = useState(false);
  //Estado para ver si hay un error
  const [error, setError] = useState(false);

  //Hook para obtener la palabra a descubrir desde una API
  useEffect(() => {
    const getWord = async () => {
        const api = await fetch('https://palabras-aleatorias-public-api.herokuapp.com/random');
        const response = await api.json();

        //Valida si la palabra tiene espacios, en caso tal vuelve a ejecutar la función
        if (/\s/.test(response.body.Word)) return getWord();

        //Guardamos la palabra sin tildes
        setWord(response.body.Word.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().split(''));
    };

    if (isPlaying) {
      getWord().then(() => {
        setIsLoading(false);
        setIsGameOver(false);
        setUserLetters([]);
        setAttemps(9);
      });
    }
    //eslint-disable-next-line
  }, [isPlaying]);

  //Hook para revisar si el usuario tiene intentos disponibles sino ha perdido el juego
  useEffect(() => {
    if (attemps <= 0) {
      setIsGameOver(true);
      stop();
      divResult.current.scrollIntoView({
        behavior: "smooth"
      });
    }
    //eslint-disable-next-line
  }, [attemps]);

  //Hook para verificar si el usuario completó todas las letras necesarias para ganar
  useEffect(() => {
    const completeWord = (letter) => userLetters.includes(letter);

    if (userLetters.length !== 0 && word.every(completeWord)) {
      setIsGameOver(true);
      stop();
      divResult.current.scrollIntoView({
        behavior: "smooth"
      });
    }
    //eslint-disable-next-line
  }, [userLetters]);

  //Hook para hacer focus en el input del modal
  useEffect(() => {
    if(showModal) {
      inputWord.current.focus();
    }
  }, [showModal])

  //Función para iniciar el juego
  const start = () => {
    setSurrender(false);
    setIsPlaying(true);
    setIsLoading(true);
    disableButton(startButton.current);
    enableButton(restartButton.current);
    enableButton(stopButton.current);
    enableButton(wordButton.current);
  };

  //Función para detener el juego
  const stop = () => {
    setIsPlaying(false);
    enableButton(startButton.current);
    disableButton(restartButton.current);
    disableButton(stopButton.current);
    disableButton(wordButton.current);
  };

  //Función para rendirse en el juego
  const giveUp = () => {
    stop();
    setIsGameOver(true);
    setSurrender(true);
  }

  //Función para reiniciar el juego
  const restart = () => {
    stop();
    setTimeout(() => {
      start();
    }, 250);
  }

  //Función para enviar la palabra ingresada por el usuario y verificar si el igual a la palabra a descubrir
  const sendWord = e => {
    e.preventDefault();

    if (!wordUser.trim()) {
      return setError(true);
    }
    
    if (wordUser.toLowerCase() === word.join('')) {
      setIsGameOver(true);
      stop();
    } else {
      setAttemps(attemps - 2);
    }

    setWordUser('');
    setError(false);
    setShowModal(false);
  };

  //Referencias a los botones principales y al div del teclado
  const startButton = useRef(null);
  const restartButton = useRef(null);
  const stopButton = useRef(null);
  const wordButton = useRef(null);
  const inputWord = useRef(null);
  const divResult = useRef(null);
  const divFloors = useRef(null);
  const divKeyboard = useRef(null);

  //Eventos para cambiar los estilos y comportamientos de los botones principales y del teclado
  const disableButton = button => {
    button.classList.add('cursor-not-allowed');
    button.classList.remove('bg-primary-red');
    button.classList.add('bg-secondary-red');
  };

  const enableButton = button => {
    button.classList.remove('cursor-not-allowed');
    button.classList.add('bg-primary-red');
    button.classList.remove('bg-secondary-red');
  };

  return (
    <div className="relative min-h-screen px-6 bg-primary-black font-display">
      <Header 
        title="react hangman game"
      />
      <div className="main-content container mx-auto p-4 bg-white border-8 border-secondary-gray rounded">
        <div className="cards flex flex-wrap justify-center items-center gap-4 h-full overflow-y-scroll md:overflow-y-auto">
          <Floors 
            isPlaying={ isPlaying }
            isLoading={ isLoading }
            userLetters={ userLetters }
            word={ word }
            divFloors={ divFloors }
          />

          <Attemps 
            attemps={ attemps }
            isPlaying={ isPlaying }
            isLoading={ isLoading }
          />          

          <Keyboard 
            attemps={ attemps }
            isGameOver={ isGameOver }
            isPlaying={ isPlaying }
            isLoading={ isLoading }
            letters={ letters }
            word={ word }
            userLetters={ userLetters }
            divFloors={ divFloors }
            divKeyboard={ divKeyboard }
            setAttemps={ setAttemps }
            setUserLetters={ setUserLetters }
          />

          <Result 
            attemps={ attemps }
            isGameOver={ isGameOver }
            isLoading={ isLoading }
            divResult={ divResult }
            word={ word }
            surrender={ surrender }
            setIsGameOver={ setIsGameOver }
          />
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center py-5">
        <div className="mx-auto font-display text-white text-center">
          <button 
            className="w-20 md:w-28 p-2 rounded-l-lg bg-primary-red hover:bg-secondary-red border border-white"
            type="button" 
            disabled={ isPlaying }
            ref={ startButton }
            onClick={ start }
          >
            Jugar
          </button>
          <button 
            className="cursor-not-allowed w-20 md:w-28 p-2 bg-secondary-red hover:bg-secondary-red border border-white" 
            type="button" 
            disabled={ !isPlaying }
            ref={ restartButton }
            onClick={ restart }
            >
            Reiniciar
          </button>
          <button 
            className="cursor-not-allowed w-20 md:w-28 p-2 rounded-r-lg bg-secondary-red hover:bg-secondary-red border border-white" 
            type="button" 
            disabled={ !isPlaying }
            ref={ stopButton }
            onClick={ giveUp }
          >
            Rendirse
          </button>
        </div>
        <div>
          <button 
            className="cursor-not-allowed p-2 rounded bg-secondary-red hover:bg-secondary-red border border-white" 
            type="button" 
            disabled={ !isPlaying }
            ref={ wordButton }
            onClick={ () => setShowModal(!showModal) }
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </button>
        </div>
      </div>
      {
        showModal
        ?
          <Fragment>
            <div
              className="px-2 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-display"
            >
              <div className="relative w-5/6 md:w-1/3 my-6 mx-auto max-w-3xl">
                <form onSubmit={ sendWord }>
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-xl font-semibold">
                        Escribe la palabra a adivinar
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-primary-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-primary-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <input
                          className="py-2 px-4 w-full rounded border border-primary-black"
                          type="text"
                          value={ wordUser }
                          ref={ inputWord }
                          onChange={ e => setWordUser( e.target.value ) }
                        />
                        {
                          error 
                          ?
                            <small className="text-red-500">Debe ingresar una palabra válida</small>
                          :
                            null
                        }
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="bg-primary-black text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Comprobar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </Fragment>
        :
          null
      }
    </div>
  );
}

export default App;