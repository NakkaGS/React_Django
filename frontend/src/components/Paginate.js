import React from 'react'

//Boostrap Components
import { Pagination, Paginator } from 'react-bootstrap'
//Router and Bootstrap

import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({pages, page, keyword='', isAdmin=false}) {

    if(keyword){
        keyword = keyword.split('?keyword=')
    }

    console.log("KEYWORD: ", keyword)
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                    key={x + 1}
                    to={`/?keyword=${keyword}&page=${x + 1}`} >
                        <Pagination.Item active={ x + 1 === page }>{x + 1}</Pagination.Item>

                    </Link>
                ))}
            </Pagination>
        )
    )
}

export default Paginate