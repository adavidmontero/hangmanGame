import React, { Fragment } from 'react';

const Attemps = ({ attemps, gameOver, loading, divResult }) => {
    return ( 
        <div className="card w-full flex flex-col justify-center items-center p-2 bg-secondary-gray text-center uppercase" ref = { divResult }>
            {
              (gameOver && attemps <= 0 && !loading)
              ?
                <Fragment>
                  <p>Te has quedado sin intentos</p>
                  <h3 className="text-5xl">¡game over!</h3>
                  <p>¡A la horca!</p>
                </Fragment>
              :
                (gameOver && attemps > 0 && !loading)
              ?
                <Fragment>
                  <p>¡Oh, has ganado!</p>
                  <h3 className="text-4xl">¡bien jugado!</h3>
                  <p>Al parecer la horca tendrá que esperar</p>
                </Fragment>
              :
                null
            }
        </div>
    );
}
 
export default Attemps;