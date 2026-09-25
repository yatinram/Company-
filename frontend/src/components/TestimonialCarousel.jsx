import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

/**
 * TestimonialCarousel - Swiper-powered testimonial slider
 * Props: testimonials [{ id, name, designation, company, review, photo_url, rating }]
 */
const TestimonialCarousel = ({ testimonials = [] }) => {
  // Fallback testimonials when API data not available
  const fallbackTestimonials = [
    {
      id: 1,
      name: 'Ravi Patel',
      designation: 'Managing Director',
      company: 'AgriTech Solutions',
      review:
        'Aventrix Solutions transformed our business with their KrushiBill ERP. The billing and inventory management is seamless. Our team adopted it within a week. Highly recommend!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      designation: 'Founder',
      company: 'StyleHub Retail',
      review:
        'The team at Aventrix is exceptional. They built our e-commerce platform with incredible attention to detail. Sales have increased by 40% since launch. Simply outstanding work!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Amit Mehta',
      designation: 'CEO',
      company: 'MediCare Clinics',
      review:
        'Professional, innovative, and dedicated. Aventrix built our patient management system on time and within budget. The support team is always responsive. 10/10!',
      rating: 5,
    },
  ];

  const items =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y]}
      spaceBetween={24}
      slidesPerView={1}
      loop={items.length > 1}
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
      style={{ paddingBottom: '3rem' }}
    >
      {items.map((t) => (
        <SwiperSlide key={t.id}>
          <div className="testimonial-card">
            {/* Stars */}
            <div className="testimonial-stars">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Quote icon */}
            <div className="testimonial-quote-icon">
              <FaQuoteLeft />
            </div>

            {/* Review text */}
            <p className="testimonial-text">"{t.review}"</p>

            {/* Author */}
            <div className="testimonial-author">
              {t.photo_url ? (
                <img
                  src={t.photo_url}
                  alt={t.name}
                  className="testimonial-avatar"
                  style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="testimonial-avatar"
                  style={{
                    background: `linear-gradient(135deg, #d94452, #35bb9b)`,
                  }}
                >
                  {getInitials(t.name)}
                </div>
              )}

              <div className="testimonial-author-info">
                <h4>{t.name}</h4>
                <p>
                  {t.designation}
                  {t.company ? `, ${t.company}` : ''}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialCarousel;
