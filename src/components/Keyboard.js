import React, { useRef } from 'react';

const Keyboard = ({ attemps, gameOver, isPlaying, loading, letters, setAttemps, userLetters, word, setUserLetters, divFloors }) => {

    //Referencias a los botones principales y al div del teclado
    const divRef = useRef(null);

    //Evento cuando el usuario presiona una letra
    const pressLetter = i => {
        //Agregamos la letra al estado de letras correctas seleccionadas por el usuario
        word.forEach(w => {
            if (w === divRef.current.children[i].value.toLowerCase()) {
                setUserLetters([
                ...userLetters,
                w
                ]);
            }
        });
        
        //Restamos intentos si la palabra no esta en el array de la palabra
        if (!word.includes(divRef.current.children[i].value.toLowerCase())) {
            setAttemps(attemps - 1);
        }
        
        //Deshabilitamos el boton cuando es presionado
        disableLetter(divRef.current.children[i]);

        if (!gameOver && attemps > 0) {
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
        <div className="card w-full flex flex-wrap justify-center items-center p-2 bg-secondary-gray" ref = { divRef }>
            {
              isPlaying && !loading
              ?
                letters.map((l, i) => (
                  <button
                    key={i}
                    id={l}
                    value={l}
                    className="font-display bg-primary-black hover:bg-secondary-black text-white px-3 py-1 w-10 rounded mr-2"
                    onClick={ () => pressLetter(i) }
                  >{l}</button>
                ))
              :
                null
            }
          </div>
    );
}
 
export default Keyboard;