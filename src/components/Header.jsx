import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContextInstance";
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt, FaBoxOpen, FaClipboardList, FaStar } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const { carrito, creditos } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const totalItems = carrito.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-3">
      <div className="container-fluid">
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Shop Credits
        </span>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    <FaBoxOpen style={{ marginRight: "6px" }} />
                    Productos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    <FaClipboardList style={{ marginRight: "6px" }} />
                    Mis pedidos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/review" className="nav-link">
                    <FaStar style={{ marginRight: "6px" }} />
                    Recuperar créditos
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {isAuthenticated && (
              <span className="fw-bold">Créditos: {creditos}</span>
            )}

            {isAuthenticated && (
              <button
                className="btn btn-outline-dark position-relative"
                onClick={() => navigate("/cart")}
                aria-label="Carrito"
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

            {!isAuthenticated ? (
              <Link to="/login" className="btn btn-outline-primary">
                <FaSignInAlt style={{ marginRight: "6px" }} />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger"
              >
                <FaSignOutAlt style={{ marginRight: "6px" }} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;