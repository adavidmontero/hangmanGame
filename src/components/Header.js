import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
    return ( 
        <div className="py-5">
            <h1 className="font-extrabold text-xl text-center text-white uppercase tracking-widest">
                { title }
            </h1>
        </div>
     );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};
 
export default Header;