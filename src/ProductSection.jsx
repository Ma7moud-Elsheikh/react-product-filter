import React, { useEffect } from 'react';
import { products } from './data';
import CustomTabs from './CustomTabs';

export default function ProductSection() {
    const [myCat, setMyCat] = React.useState([]);
    const [initCat, setInitCat] = React.useState('all');
    const [myProducts, setMyProducts] = React.useState(products);
    const [priceStep, setPriceStep] = React.useState(1); // 1 = first range

    function handleCat() {
        const uniqueCat = ['all', ...new Set(products.map((data) => data.category))];
        const changeCatData = uniqueCat.map((data) => ({
            label: data,
            value: data
        }));
        setMyCat(changeCatData);
    }

    function getPriceRange(step) {
        switch (step) {
            case 1:
                return { min: 15, max: 35 };
            case 2:
                return { min: 40, max: 80 };
            case 3:
                return { min: 85, max: 120 };
            default:
                return { min: 0, max: Infinity };
        }
    }

    function handleFilterProduct() {
        const { min, max } = getPriceRange(priceStep);

        let filtered = products;

        if (initCat !== 'all') {
            filtered = filtered.filter((data) => data.category === initCat);
        }

        filtered = filtered.filter((data) => data.price >= min && data.price <= max);

        setMyProducts(filtered);
    }

    useEffect(() => {
        handleCat();
    }, []);

    useEffect(() => {
        handleFilterProduct();
    }, [initCat, priceStep]);

    return (
        <div className="shop-section">
            <CustomTabs myCat={myCat} setInitCat={setInitCat} initCat={initCat} priceStep={priceStep} setPriceStep={setPriceStep} getPriceRange={getPriceRange} />

            <div className="cards">
                {myProducts.map((data) => (
                    <div className="card" key={data.id}>
                        <img src={data.image} alt="" />
                        <span>{data.price}$</span>
                        <div className="overlay">
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
