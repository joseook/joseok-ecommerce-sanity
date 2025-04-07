import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import { TbCategoryFilled } from 'react-icons/tb';
import { BsStars } from 'react-icons/bs';
import { HiOutlineArrowRight } from 'react-icons/hi';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Categorias simuladas (em uma aplicação real, viriam do backend)
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'headphones', name: 'Headphones' },
    { id: 'speakers', name: 'Speakers' },
    { id: 'wearables', name: 'Wearables' },
  ];

  // Coleções em destaque (em uma aplicação real, seriam curadas no CMS)
  const featuredCollections = [
    { id: 'new-arrivals', name: 'New Arrivals', icon: <BsStars /> },
    { id: 'best-sellers', name: 'Best Sellers', icon: <FiShoppingBag /> },
    { id: 'trending', name: 'Trending Now', icon: <TbCategoryFilled /> },
  ];

  // Filtra produtos com base na categoria e termo de busca
  useEffect(() => {
    if (activeCategory === 'all' && searchTerm === '') {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' ||
        product.name.toLowerCase().includes(activeCategory.toLowerCase());
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.details &&
          product.details.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, products]);

  // Produtos em destaque (primeiros 4 produtos como exemplo)
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Head>
        <title>Modern E-Commerce | Premium Audio & Wearable Tech</title>
        <meta
          name="description"
          content="Shop the latest premium audio gear and wearable technology with free shipping and easy returns."
        />
        <meta
          property="og:title"
          content="Modern E-Commerce | Premium Audio & Wearable Tech"
        />
        <meta
          property="og:description"
          content="Shop the latest premium audio gear and wearable technology with free shipping and easy returns."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        {/* Hero Banner */}
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

        {/* Featured Collections */}
        <section className="featured-collections">
          <div className="container">
            <div className="collections-grid">
              {featuredCollections.map((collection) => (
                <motion.div
                  key={collection.id}
                  className="collection-card"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/collection/${collection.id}`}>
                    <div className="collection-icon">{collection.icon}</div>
                    <h3>{collection.name}</h3>
                    <div className="collection-link">
                      <span>Shop Now</span>
                      <HiOutlineArrowRight />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation & Search */}
        <section className="category-navigation">
          <div className="container">
            <div className="category-nav-wrapper">
              <div className="categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-button ${
                      activeCategory === category.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <div className="container">
            <div className="products-heading">
              <div className="heading-content">
                <h2>Explore Our Products</h2>
                <p>Discover premium quality audio gear and wearable technology.</p>
              </div>
              <Link href="/products" className="view-all-link">
                View All Products <HiOutlineArrowRight />
              </Link>
            </div>

            <motion.div
              className="products-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Product product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="no-results">
                  <p>No products found matching your criteria.</p>
                  <button
                    className="reset-filters"
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <div className="container">
            <div className="section-heading">
              <h2>Featured Products</h2>
              <p>Our most popular premium products</p>
            </div>

            <div className="featured-products-grid">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  className="featured-product-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/product/${product.slug.current}`}>
                    <div className="featured-badge">Featured</div>
                    <Product product={product} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Banner */}
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;