import React from 'react'

const CopyButton = ({handleClick}) => {
    return (
        <button
            onClick={handleClick}
            className='px-3 py-1 mt-3 hover:bg-green-300 rounded bg-green-200 text-green-800 text-center border border-green-400'
        >
            copy
        </button>
    )
}
export default CopyButton;
