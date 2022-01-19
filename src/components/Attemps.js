import { Fragment } from 'react';
import PropTypes from 'prop-types';

const Attemps = ({ attemps, isPlaying, isLoading }) => {
    return ( 
        <div className="card w-full flex flex-col justify-center items-center p-2 bg-secondary-gray">
            {
              isPlaying && !isLoading
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

Attemps.propTypes = {
  attemps: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
 
export default Attemps;