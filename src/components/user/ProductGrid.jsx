import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { initialProducts } from '../../data/initialData';
import './ProductGrid.css';

export default function ProductGrid({ products = initialProducts, onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Citrus', 'Tropical', 'Berry', 'Organic', '🔥 Bestsellers'];

    // Filter
    const filteredProducts = products.filter(product => {
        // Category
        let matchesCategory = true;
        if (selectedCategory === '🔥 Bestsellers') {
            matchesCategory = product.isPopular;
        } else if (selectedCategory !== 'All') {
            matchesCategory = product.category === selectedCategory;
        }

        // Search
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="product-grid-section" id="products">
            <div className="section-header">
                <span className="section-badge">🍊 Direct Wholesale Storefront</span>
                <h2 className="section-title">Explore Our Premium Juices</h2>
                <p className="section-subtitle">
                    Cold-pressed from 100% real fruits with zero concentrate or artificial preservatives. Minimum order quantities apply for bulk pricing.
                </p>
            </div>

            <div className="catalog-toolbar">
                <div className="filter-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search flavor or fruit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearchQuery('')}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            <div className="results-info">
                <span>Showing <strong>{filteredProducts.length}</strong> wholesale items</span><br></br>
                <span>Every Carton Contains <strong>24</strong> Bottles</span>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid-layout">
                    {filteredProducts.map(item => (
                        <ProductCard
                            key={item.id}
                            product={item}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state glass-card">
                    <div className="empty-icon">🍹</div>
                    <h3>No Juices Found</h3>
                    <p>We couldn't find any products matching your search criteria.</p>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                    >
                        Reset All Filters
                    </button>
                </div>
            )}

        </section>
    );
}
