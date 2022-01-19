import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Keyboard = ({ attemps, isGameOver, isPlaying, isLoading, letters, userLetters, word, setAttemps, setUserLetters, divFloors, divKeyboard }) => {

    useEffect(() => {
        if (isPlaying) {
          divKeyboard.current.scrollIntoView({
            behavior: "smooth"
          });
        }
        //eslint-disable-next-line
      }, [isPlaying]);

    //Evento cuando el usuario presiona una letra
    const pressLetter = i => {
        //Agregamos la letra al estado de letras correctas seleccionadas por el usuario
        word.forEach(w => {
            if (w === divKeyboard.current.children[i].value.toLowerCase()) {
                setUserLetters([
                ...userLetters,
                w
                ]);
            }
        });
        
        //Restamos intentos si la palabra no esta en el array de la palabra
        if (!word.includes(divKeyboard.current.children[i].value.toLowerCase())) {
            setAttemps(attemps - 1);
        }
        
        //Deshabilitamos el boton cuando es presionado
        disableLetter(divKeyboard.current.children[i]);

        if (!isGameOver && attemps > 0) {
            divFloors.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    const disableLetter = button => {
        button.disabled = true;
        button.classList.add('cursor-not-allowed');
        button.classList.remove('bg-primary-black');
        button.classList.remove('hover:bg-secondary-black');
        button.classList.add('bg-secondary-red');
    };

    return ( 
        <div className="card w-full flex flex-wrap justify-center items-center p-2 bg-secondary-gray" ref = { divKeyboard }>
            {
              isPlaying && !isLoading
              ?
                letters.map((l, i) => (
                  <button
                    key={ i }
                    id={ l }
                    value={ l }
                    className="font-display bg-primary-black hover:bg-secondary-black text-white px-3 py-1 w-10 rounded mr-2"
                    onClick={ () => pressLetter(i) }
                  >{ l }</button>
                ))
              :
                null
            }
          </div>
    );
}

Keyboard.propTypes = {
  attemps: PropTypes.number.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  letters: PropTypes.array.isRequired,
  userLetters: PropTypes.array.isRequired,
  word: PropTypes.array.isRequired,
  setAttemps: PropTypes.func.isRequired,
  setUserLetters: PropTypes.func.isRequired, 
  divFloors: PropTypes.object.isRequired, 
  divKeyboard: PropTypes.object.isRequired 
};
 
export default Keyboard;