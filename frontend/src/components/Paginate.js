import React from "react";
import { Link } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    if (keyword && typeof(keyword !== "undefined")) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    } 

    return (pages > 1 && (
        <div className='pagination'>
            {[...Array(pages).keys()].map((x) => (

                <Link 
                    key={x + 1} 
                    to={!isAdmin ?
                        `/?keyword=${keyword}&page=${x + 1}`
                        : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                    }>

                        {((x + 1) === page) 
                            ? <p className='active'>{x + 1}</p> 
                            : <p className=''>{x + 1}</p> 
                        }
                        
                </Link>
            ))}
        </div>
    ))
}

export default Paginate
