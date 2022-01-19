import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

const Result = ({ attemps, isGameOver, isLoading, word, surrender, setIsGameOver, divResult }) => {

  useEffect(() => {
    if (surrender || isGameOver) {
      divResult.current.scrollIntoView({
        behavior: "smooth"
      });
    }

    if (isGameOver) {
      setTimeout(() => {
        setIsGameOver(false);
      }, 5000);
    }
    //eslint-disable-next-line
  }, [surrender, isGameOver]);

    return ( 
        <div className="card w-full flex flex-col justify-center items-center p-2 bg-secondary-gray text-center uppercase" ref = { divResult }>
            {
              (isGameOver && attemps <= 0 && !isLoading && !surrender)
              ?
                <Fragment>
                  <h3 className="text-5xl">¡game over!</h3>
                  <p>¡Te has quedado sin intentos, A la horca!</p>
                  <p>Palabra: <span className="font-bold text-red-600">{ word }</span></p>
                </Fragment>
              :
                (isGameOver && attemps > 0 && !isLoading && !surrender)
              ?
                <Fragment>
                  <h3 className="text-4xl">¡bien jugado!</h3>
                  <p>¡Has ganado! Al parecer la horca tendrá que esperar</p>
                  <p>Palabra: <span className="font-bold text-red-600">{ word }</span></p>
                </Fragment>
              :
                (isGameOver && surrender)
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

Result.propTypes = {
  attemps: PropTypes.number.isRequired, 
  isGameOver: PropTypes.bool.isRequired, 
  isLoading: PropTypes.bool.isRequired, 
  word: PropTypes.array.isRequired, 
  surrender: PropTypes.bool.isRequired, 
  setIsGameOver: PropTypes.func.isRequired,
  divResult: PropTypes.object.isRequired
}
 
export default Result;