import { Fragment } from 'react';

const Result = ({ attemps, isPlaying, loading }) => {
    return ( 
        <div className="card w-full flex flex-col justify-center items-center p-2 bg-secondary-gray">
            {
              isPlaying && !loading
              ?
                <Fragment>
                  <p>Tienes</p>
                  <h3 className="text-7xl">{ attemps }</h3>
                  <p>intento(s)</p>
                </Fragment>
              :
                null
            }
        </div>
    );
}
 
export default Result;