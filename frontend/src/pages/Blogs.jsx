import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaArrowRight, FaClock, FaUser } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const blogPosts = [
  {
    id: 1,
    title: 'How AI Automation is Transforming Modern Business Operations',
    excerpt: 'Explore how generative AI and workflow automations are reducing overhead costs and improving client turnaround times.',
    date: 'Sep 2026',
    readTime: '4 min read',
    author: 'Aventrix Tech Team',
    category: 'AI & Automation'
  },
  {
    id: 2,
    title: 'Why Purpose-Built ERPs Outperform Generic Invoicing Software',
    excerpt: 'A deep-dive into how specialized software like KrushiBill ERP addresses unique dealer workflows like batch expiry and farmer ledgers.',
    date: 'Sep 2026',
    readTime: '5 min read',
    author: 'Aventrix Engineering',
    category: 'Enterprise Software'
  },
  {
    id: 3,
    title: 'Building Scalable Full-Stack Web Applications with React & Node',
    excerpt: 'Best practices for high-speed client rendering, secure RESTful APIs, and relational MySQL database architecture.',
    date: 'Aug 2026',
    readTime: '6 min read',
    author: 'Aventrix Team',
    category: 'Web Development'
  }
];

export default function Blogs() {
  return (
    <div className="page-wrapper">
      <SEO
        title="Engineering Blogs, Tech Insights & Guides"
        description="Read software engineering insights, web development tutorials, and technology trends from the Aventrix Solutions technical team."
        keywords="software development blogs, tech articles, AI automation tutorials, React Nodejs guides, Aventrix Blogs"
        canonicalUrl="/blogs"
      />

      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
              Insights & Articles
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Technology <span style={{ color: '#d94452' }}>Blogs</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              Insights, technical tutorials, and industry updates from our software engineering leads.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {blogPosts.map((post) => (
              <AnimatedSection key={post.id}>
                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <span style={{ alignSelf: 'flex-start', background: 'rgba(53, 187, 155, 0.1)', color: '#35bb9b', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '16px' }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.3, marginBottom: '12px' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px', fontSize: '0.85rem', color: '#94a3b8' }}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
