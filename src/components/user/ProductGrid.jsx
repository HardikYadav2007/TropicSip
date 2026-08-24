import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { initialProducts } from '../../data/initialData';

export default function ProductGrid({ products = initialProducts, onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Citrus', 'Tropical', 'Berry', 'Organic', '🔥 Bestsellers'];

    // Filter Logic
    const filteredProducts = products.filter(product => {
        // Category check
        let matchesCategory = true;
        if (selectedCategory === '🔥 Bestsellers') {
            matchesCategory = product.isPopular;
        } else if (selectedCategory !== 'All') {
            matchesCategory = product.category === selectedCategory;
        }

        // Search query check
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

            {/* FilterSearch Bar */}
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

            {/* Product Counter Indicator */}
            <div className="results-info">
                <span>Showing <strong>{filteredProducts.length}</strong> wholesale items</span><br></br>
                <span>Every Carton Contains <strong>24</strong> Bottles</span>
            </div>

            {/* Grid Container */}
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

            <style>{`
                .product-grid-section {
                    width: calc(100% - 2rem);
                    max-width: 1320px;
                    margin: 60px auto;
                    padding: 0 10px;
                    padding-bottom: 20px;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 36px;
                }

                .section-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 20px;
                    background: rgba(255, 107, 53, 0.1);
                    color: var(--primary-orange);
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 12px;
                    border: 1px solid rgba(255, 107, 53, 0.2);
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: var(--text-dark);
                    letter-spacing: -0.5px;
                    margin-bottom: 10px;
                }

                .section-subtitle {
                    font-size: 1rem;
                    color: var(--text-muted);
                    max-width: 640px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .catalog-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin-bottom: 24px;
                    background: #ffffff;
                    padding: 14px 20px;
                    border-radius: 20px;
                    border: 1px solid var(--border-glass);
                    box-shadow: var(--shadow-card);
                }

                .filter-tabs {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    padding-bottom: 4px;
                    scroll-behavior: smooth;
                }

                .filter-tabs::-webkit-scrollbar {
                    display: none;
                }

                .tab-btn {
                    padding: 10px 18px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                    background: #f8fafc;
                    color: var(--text-main);
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.25s ease;
                }

                .tab-btn:hover {
                    background: #f1f5f9;
                    color: var(--primary-orange);
                }

                .tab-btn.active {
                    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-mango));
                    color: #ffffff;
                    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    background: var(--bg-main);
                    border: 1.5px solid var(--border-subtle);
                    border-radius: 12px;
                    padding: 8px 14px;
                    min-width: 260px;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .search-box:focus-within {
                    border-color: var(--primary-orange);
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
                    background: #ffffff;
                }

                .search-icon {
                    margin-right: 8px;
                    font-size: 0.95rem;
                    opacity: 0.7;
                }

                .search-box input {
                    border: none;
                    outline: none;
                    background: transparent;
                    width: 100%;
                    font-family: var(--font-family);
                    font-size: 0.92rem;
                    color: var(--text-main);
                }

                .clear-search {
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    cursor: pointer;
                    padding: 0 4px;
                }

                .results-info {
                    font-size: 0.88rem;
                    color: var(--text-muted);
                    margin-bottom: 20px;
                    padding-left: 4px;
                }

                .grid-layout {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 15px;
                }

                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    margin: 40px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }

                .empty-icon {
                    font-size: 3.5rem;
                }

                .empty-state h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-dark);
                }

                .empty-state p {
                    color: var(--text-muted);
                    max-width: 400px;
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 1.8rem;
                    }
                    .catalog-toolbar {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .search-box {
                        width: 100%;
                    }
                    .grid-layout {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
