import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/feature/cart/hooks/useCart';
import './Navbar.css';

const Navbar = () => {
    const { totalItems } = useCart();
    const { pathname } = useLocation();

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <Link to="/" className="navbar__brand">
                    <span className="navbar__logo">🛍</span>
                    <span className="navbar__brand-name">FakeStore</span>
                </Link>

                <nav className="navbar__nav">
                    <Link
                        to="/"
                        className={`navbar__link ${pathname === '/' ? 'navbar__link--active' : ''}`}
                    >
                        Products
                    </Link>
                </nav>

                <Link to="/cart" className="navbar__cart">
                    <span className="navbar__cart-icon">🛒</span>
                    <span className="navbar__cart-label">Cart</span>
                    {totalItems > 0 && (
                        <span className="navbar__cart-badge">{totalItems}</span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
