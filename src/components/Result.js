import React, { useEffect, Fragment } from 'react';

const Result = ({ attemps, gameOver, loading, divResult, word, surrender }) => {

  useEffect(() => {
    if (surrender || gameOver) {
      divResult.current.scrollIntoView({
        behavior: "smooth"
      });
    }
    //eslint-disable-next-line
  }, [surrender, gameOver]);

    return ( 
        <div className="card w-full flex flex-col justify-center items-center p-2 bg-secondary-gray text-center uppercase" ref = { divResult }>
            {
              (gameOver && attemps <= 0 && !loading && !surrender)
              ?
                <Fragment>
                  <h3 className="text-5xl">¡game over!</h3>
                  <p>¡Te has quedado sin intentos, A la horca!</p>
                  <p>Palabra: <span className="font-bold text-red-600">{ word }</span></p>
                </Fragment>
              :
                (gameOver && attemps > 0 && !loading)
              ?
                <Fragment>
                  <h3 className="text-4xl">¡bien jugado!</h3>
                  <p>¡Has ganado! Al parecer la horca tendrá que esperar</p>
                  <p>Palabra: <span className="font-bold text-red-600">{ word }</span></p>
                </Fragment>
              :
                (surrender)
              ?
                <Fragment>
                  <h3 className="text-5xl">¡game over!</h3>
                  <p>Esperaba mucho más de ti, ¡A la horca!</p>
                  <p>Palabra: <span className="font-bold text-red-600">{ word }</span></p>
                </Fragment>
              :
                null
            }
        </div>
    );
}
 
export default Result;