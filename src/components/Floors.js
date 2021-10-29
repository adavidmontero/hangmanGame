
const Floors = ({ isPlaying, loading, userLetters, word, divFloors }) => {
    return ( 
        <div className="card w-full flex flex-wrap justify-center items-center p-2 bg-secondary-gray" ref = { divFloors }>
            {
              isPlaying && !loading
              ?
                word.map((w, index) => (
                  <span key={index} className="px-2 w-8 h-8 font-display font-bold text-center border-b-4 border-primary-black mr-1">{ userLetters.includes(w) ? w : '' }</span>
                ))
              :
                null
            }
        </div>
    );
}
 
export default Floors;