import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CompanyProvider } from './context/CompanyContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminShortcutListener from './components/AdminShortcutListener';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Industries from './pages/Industries';
import About from './pages/About';
import OurWorks from './pages/OurWorks';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Admin Pages & Protected Route
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminServices from './admin/pages/AdminServices';
import AdminProducts from './admin/pages/AdminProducts';
import AdminPortfolio from './admin/pages/AdminPortfolio';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminContacts from './admin/pages/AdminContacts';
import AdminCompanySettings from './admin/pages/AdminCompanySettings';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      <ScrollToTop />
      <AdminShortcutListener />

      {isAdminRoute ? (
        // Admin Routes (Isolated layout with dark sidebar)
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute title="Overview Dashboard">
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <AdminProtectedRoute title="Services Management">
                <AdminServices />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute title="Products Management">
                <AdminProducts />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio"
            element={
              <AdminProtectedRoute title="Portfolio & Our Works">
                <AdminPortfolio />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AdminProtectedRoute title="Testimonials Management">
                <AdminTestimonials />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <AdminProtectedRoute title="Contact Inquiries">
                <AdminContacts />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/company-settings"
            element={
              <AdminProtectedRoute title="Company Settings">
                <AdminCompanySettings />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      ) : (
        // Public Website Layout
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<OurWorks />} />
              <Route path="/our-works" element={<OurWorks />} />
              <Route path="/portfolio" element={<OurWorks />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CompanyProvider>
    </AuthProvider>
  );
}
