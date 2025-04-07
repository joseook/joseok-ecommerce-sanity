import React, { useState, useEffect, useRef } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai';
import { FiShare2, FiTruck, FiShoppingBag } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import { BsChevronRight, BsBoxSeam } from 'react-icons/bs';
import Link from 'next/link';
import Head from 'next/head';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [inWishlist, setInWishlist] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const productInfoRef = useRef(null);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  // Simulação de status de estoque
  const inStock = true;
  const stockCount = 12;

  // Efeito para tornar informações do produto fixas ao rolar
  useEffect(() => {
    const handleScroll = () => {
      if (productInfoRef.current) {
        const { top } = productInfoRef.current.getBoundingClientRect();
        if (top <= 80) {
          productInfoRef.current.classList.add('sticky-product-info');
        } else {
          productInfoRef.current.classList.remove('sticky-product-info');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
    // Em uma aplicação real, interagiria com uma API de lista de desejos
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this ${name}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleImageZoom = (e) => {
    if (!imageZoomed) return;

    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div>
      <Head>
        <title>{name} | Modern E-Commerce</title>
        <meta name="description" content={details.substring(0, 160)} />
      </Head>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <Link href="/">
            <BiHomeAlt /> Home
          </Link>
          <BsChevronRight />
          <Link href="/products">
            Products
          </Link>
          <BsChevronRight />
          <span>{name}</span>
        </div>
      </div>

      <div className="product-detail-container">
        {/* Product Images Gallery */}
        <div className="product-image-wrapper">
          <div
            className={`image-container ${imageZoomed ? 'zoomed' : ''}`}
            onMouseMove={handleImageZoom}
            onMouseEnter={() => setImageZoomed(true)}
            onMouseLeave={() => {
              setImageZoomed(false);
              document.querySelector('.product-detail-image').style.transformOrigin =
                'center';
            }}
          >
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
              alt={name}
            />
            <div className="image-zoom-hint">
              <span>Hover to zoom</span>
            </div>
          </div>

          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                alt={`${name} - View ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc" ref={productInfoRef}>
          {/* Stock Status Indicator */}
          <div className="stock-status">
            {inStock ? (
              <span className="in-stock">In Stock ({stockCount} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <h1>{name}</h1>

          {/* Enhanced Reviews Section */}
          <div className="reviews">
            <div className="stars">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <span className="rating">4.0</span>
            </div>
            <div className="review-count">
              <a href="#reviews">Read 20 reviews</a>
            </div>
          </div>

          {/* Price with potential discount */}
          <div className="price-container">
            <p className="price">${price}</p>
            {/* Uncomment for sales
            <p className="original-price">${price * 1.2}</p>
            <p className="discount">20% OFF</p>
            */}
          </div>

          {/* Product Actions Row */}
          <div className="product-actions">
            <button
              type="button"
              className="wishlist-btn"
              onClick={toggleWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {inWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>

            <button
              type="button"
              className="share-btn"
              onClick={handleShare}
              aria-label="Share this product"
            >
              <FiShare2 />
            </button>
          </div>

          {/* Tabs for Product Information */}
          <div className="product-tabs">
            <div className="tabs-header">
              <button
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={activeTab === 'details' ? 'active' : ''}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={activeTab === 'shipping' ? 'active' : ''}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-description">
                  <p>{details}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="tab-details">
                  <ul>
                    <li>
                      <strong>Brand:</strong> {name.split(' ')[0]}
                    </li>
                    <li>
                      <strong>Model:</strong> {name}
                    </li>
                    <li>
                      <strong>Warranty:</strong> 1 Year
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="tab-shipping">
                  <div className="shipping-option">
                    <FiTruck />
                    <div>
                      <h4>Free Standard Shipping</h4>
                      <p>Estimated delivery in 3-5 business days</p>
                    </div>
                  </div>

                  <div className="shipping-option">
                    <BsBoxSeam />
                    <div>
                      <h4>Express Delivery</h4>
                      <p>Estimated delivery in 1-2 business days (+$10)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Quantity Selector */}
          <div className="quantity-section">
            <div className="quantity">
              <h3>Quantity:</h3>
              <div className="quantity-desc">
                <button
                  className="minus"
                  onClick={decQty}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <AiOutlineMinus />
                </button>
                <span className="num">{qty}</span>
                <button
                  className="plus"
                  onClick={incQty}
                  disabled={qty >= stockCount}
                  aria-label="Increase quantity"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            {qty >= stockCount && (
              <p className="max-quantity-warning">Maximum available quantity selected</p>
            )}
          </div>

          {/* Improved Action Buttons */}
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
              disabled={!inStock}
            >
              <FiShoppingBag />
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={handleBuyNow}
              disabled={!inStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;