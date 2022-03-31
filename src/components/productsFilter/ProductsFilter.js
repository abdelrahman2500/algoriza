import React, { useEffect, useState } from 'react'
import RangeSlider from '../rangeSlider/RangeSlider';
import Rating from '../rating/Rating';
import './index.scss'

export default function ProductsFilter({products, filterdProducts, setFilterdProducts, activeProductFilter, theme}) {
    const [brands, setBrands] = useState(new Set());
    const [brandsArr, setbrandsArr] = useState([]);


    // hanle array of unique brands from array
    useEffect(() => {
        products.map((pro) => setBrands(brands.add(pro.brand)));
        setbrandsArr([...brands]);
    }, [products]);


        // handle filter by price range
    function handleRangePrice(e){
        // e.preventDefault()
        switch (e.target.value) {
            case "all":
                setFilterdProducts(products)
                break;
            case "<=$10":
                setFilterdProducts(products.filter(product => product.price <= 10))
                break;
            case "$10-$100":
                setFilterdProducts(products.filter(product => product.price > 10 && product.price <= 100))
                break;
            case "$100-$500":
                setFilterdProducts(products.filter(product => product.price > 100 && product.price <= 500))
                break;
            case ">=500$":
                setFilterdProducts(products.filter(product => product.price > 500))
                break;
            default:
                break;
        }
    }

    // handle filter by brand
    function handleBrand(e){
        setFilterdProducts(products.filter(product => product.brand == e.target.value))
    }

    // handle filter by rating
    function handleRating(rate){
        setFilterdProducts(products.filter(product => product.rating >= rate))
    }

    

    return (
        <div className={`products-filter ${theme}-theme ${activeProductFilter} `}>
            <h6 className='filter-title'>Filters</h6>
            <div className='filter-options'>
                <form onChange={(e) => handleRangePrice(e)}>
                    <label htmlFor="multi-range">
                        <h6>Multi Range</h6>
                    </label>
                    <label className="form-control">
                        <input type="radio" id="multi-range" name="range" value="all" />
                        All
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="multi-range" name="range" value="<=$10" />
                        {`<=$10`}
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="multi-range" name="range" value="$10-$100" />
                        $10-$100
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="multi-range" name="range" value="$100-$500" />
                        $100-$500
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="multi-range" name="range" value=">=500$" />
                        {`>=500$`}
                    </label> 
                </form>
                <form >
                    <label htmlFor="price-range">
                        <h6>Price Range</h6>
                    </label>
                    <RangeSlider products={products} theme={theme} setFilterdProducts={setFilterdProducts} />
                </form>
                <form>
                    <label htmlFor="categories">
                        <h6>Categoriese</h6>
                    </label>
                    <label className="form-control">
                        <input type="radio" id="categories" name="range" value="Appliances" />
                        Appliances
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="categories" name="range" value="Audio" />
                        Audio
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="categories" name="range" value="Cameras&Camcorders" />
                        Cameras & Camcorders
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="categories" name="range" value="Cell-Phones" />
                        Cell Phones
                    </label> 
                    <label className="form-control">
                        <input type="radio" id="categories" name="range" value="Video-Games" />
                        Video Games
                    </label> 
                </form>
                <form onChange={(e) => handleBrand(e)}>
                    <label htmlFor="brand">
                        <h6>Brands</h6>
                    </label>
                    {brandsArr.map(brand => (
                        <label className="form-control" key={brand}>
                            <input type="radio" id="brand" name="range" value={brand} />
                            {brand}
                        </label>
                    ))}
                </form>
                <form>
                    <label>
                        <h6>Rating</h6>
                    </label>
                    {Array(5).fill("").map((_, i) => (
                        <div className='row' key={i}>
                            <div className='products-rating'  onClick={()=> handleRating(Array(5).fill("").length - i)}>
                                <Rating num={Array(5).fill("").length - i} />
                                <span>
                                    & up
                                </span>
                            </div>
                            <span className='products-amount'>{products.filter(product => product.rating >= Array(5).fill("").length - i).length}</span>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}
