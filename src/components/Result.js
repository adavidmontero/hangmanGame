import React, { Fragment } from 'react';

const Result = ({ attemps, gameOver, loading, divResult, word }) => {
    return ( 
        <div className="card w-full flex flex-col justify-center items-center p-2 bg-secondary-gray text-center uppercase" ref = { divResult }>
            {
              (gameOver && attemps <= 0 && !loading)
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
                null
            }
        </div>
    );
}
 
export default Result;