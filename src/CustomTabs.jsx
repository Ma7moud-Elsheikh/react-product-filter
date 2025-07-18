import React from 'react';

export default function CustomTabs({ myCat = [], setInitCat, initCat, priceStep, setPriceStep, getPriceRange }) {
    return (
        <div className="custom-tabs">
            <div className="tabs">
                {myCat.map((item) => (
                    <span className={initCat == item.value ? 'active' : ''} key={item.value} onClick={() => setInitCat(item.value)}>
                        {item.label}
                    </span>
                ))}
            </div>
            <div className="priceInput">
                <label>Filter by price range:</label>
                <input type="range" min="1" max="3" value={priceStep} onChange={(e) => setPriceStep(Number(e.target.value))} />
                <div>
                    {(() => {
                        const { min, max } = getPriceRange(priceStep);
                        return (
                            <span>
                                {min}$ - {max}$
                            </span>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
