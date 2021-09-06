import React from 'react';

const Header = ({title}) => {
    return ( 
        <div className="py-5">
            <h1 className="font-extrabold text-xl text-center text-white uppercase tracking-widest">
                {title}
            </h1>
        </div>
     );
}
 
export default Header;