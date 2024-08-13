import React, { useEffect, useState } from 'react'
import MultiselectSearch from './multiselect-search';

export default function Products() {

    const [selected, setSelected] = useState([])
    const [result, setResult] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [showSuggestion, setShowSuggestion] = useState(false);

    let totalPages = products?.length / 10;

    const handlePagination = (currentPage) => {
        if (currentPage > 0 && currentPage <= (totalPages))
            setPage(currentPage)
    }

    const fetchProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=100`)
        const data = await res.json()
        setProducts(data?.products)
        setResult(data?.products)
        console.log("Data", data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        let filteredProducts = [];
        if (selected && selected.length > 0) {
            filteredProducts = result.filter((product) => selected.includes(product.title))
            setProducts(() => filteredProducts)
        } else {
            fetchProducts()
            setShowSuggestion(false)
        }
    }, [selected])

    useEffect(() => {
        console.log("filteredProducts", products);
    }, [products])

    console.log(products.slice(page * 10 - 10, page * 10));


    return (
        <>
            <MultiselectSearch
                selected={selected}
                setSelected={setSelected}
                showSuggestion={showSuggestion}
                setShowSuggestion={setShowSuggestion} />
            <div className='products'>
                {products && products.length > 0 && products.slice(page * 10 - 10, page * 10).map((prod, index) => {
                    return (
                        <div key={prod.id} className='product-card'>
                            <p>{prod.title}</p>
                            <div className='product-card-image'>
                                <img className='img' src={prod.thumbnail} alt={prod.title} />
                            </div>
                            <p>{prod.description}</p>
                        </div>
                    )
                })}

            </div >
            <div className='pagination'>
                {page !== 1 && <span className='prev' onClick={() => handlePagination(page - 1)} >⏮</span>}
                {[...Array(Math.floor(totalPages))].map((_, i) => {
                    return (
                        <span key={i} className={`pagination-tile ${page === i + 1 ? "pagination-tile-active" : ""}`} onClick={() => handlePagination(i + 1)} >{i + 1}</span>
                    )
                })}
                {(Math.floor(totalPages) !== page && Math.floor(totalPages) > 0) && <span className='next' onClick={() => handlePagination(page + 1)} >⏭</span>}
            </div >
        </>
    )
}
