import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { BsBagCheckFill } from 'react-icons/bs';
import { FiShare2, FiClock, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IoLogoFacebook, IoLogoTwitter, IoLogoWhatsapp } from 'react-icons/io5';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';
import { client } from '../lib/client';
import { Product } from '../components';

const Success = ({ products }) => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [isAnimating, setIsAnimating] = useState(true);
  const [orderNumber] = useState(`ORD-${Math.floor(Math.random() * 1000000)}`);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // Delivery in 5 days
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  });
  
  // Get suggested products - in a real app, these would be based on purchase history
  const suggestedProducts = products ? products.slice(0, 3) : [];
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
    
    // Stop animation after 3 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleShare = (platform) => {
    const message = `I just made a purchase from Modern E-Commerce! Check them out.`;
    const url = window.location.origin;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${message}&url=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${message} ${url}`, '_blank');
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(`${message} ${url}`);
        alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <Head>
        <title>Order Confirmed | Modern E-Commerce</title>
        <meta name="description" content="Thank you for your purchase! Your order has been confirmed." />
      </Head>
      
      <div className="success-wrapper">
        <motion.div 
          className="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-header">
            <motion.div 
              className="animated-checkmark-container"
              initial={{ scale: 0.8 }}
              animate={{ scale: isAnimating ? [0.8, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0, repeatType: "reverse" }}
            >
              <div className="animated-checkmark">
                <BsBagCheckFill />
              </div>
            </motion.div>
            
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt.</p>
          </div>
          
          <div className="order-details">
            <div className="order-info-row">
              <div className="order-info-item">
                <h3>Order Number</h3>
                <p>{orderNumber}</p>
              </div>
              
              <div className="order-info-item">
                <h3>Estimated Delivery</h3>
                <p><AiOutlineCalendar /> {estimatedDelivery}</p>
              </div>
              
              <div className="order-info-item">
                <h3>Shipping Method</h3>
                <p><FiClock /> Standard Shipping (5-7 days)</p>
              </div>
            </div>
            
            <div className="order-status">
              <div className="status-bar">
                <div className="status-step completed">
                  <div className="status-icon">✓</div>
                  <p>Order Placed</p>
                </div>
                <div className="status-line"></div>
                <div className="status-step">
                  <div className="status-icon">2</div>
                  <p>Processing</p>
                </div>
                <div className="status-line"></div>
                <div className="status-step">
                  <div className="status-icon">3</div>
                  <p>Shipped</p>
                </div>
                <div className="status-line"></div>
                <div className="status-step">
                  <div className="status-icon">4</div>
                  <p>Delivered</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="success-actions">
            <p className="description">
              If you have any questions, please email
              <a className="email" href="mailto:order@example.com">
                order@example.com
              </a>
            </p>
            
            <div className="social-share">
              <p>Share your purchase:</p>
              <div className="share-buttons">
                <button onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
                  <IoLogoFacebook />
                </button>
                <button onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                  <IoLogoTwitter />
                </button>
                <button onClick={() => handleShare('whatsapp')} aria-label="Share on WhatsApp">
                  <IoLogoWhatsapp />
                </button>
                <button onClick={() => handleShare()} aria-label="Copy link">
                  <FiShare2 />
                </button>
              </div>
            </div>
            
            <Link href="/">
              <a className="continue-shopping">
                <FiShoppingBag />
                Continue Shopping
                <FiArrowRight />
              </a>
            </Link>
          </div>
          
          {suggestedProducts.length > 0 && (
            <div className="suggested-products">
              <h3>You might also like</h3>
              <div className="suggested-products-grid">
                {suggestedProducts.map((product) => (
                  <motion.div 
                    key={product._id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Product product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
// Get suggested products from Sanity
export const getServerSideProps = async () => {
  const query = '*[_type == "product"][0...3]';
  const products = await client.fetch(query);
  
  return {
    props: { products }
  }
}

export default Success;
