import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Header from "../components/Header";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import ReviewPage from "../pages/ReviewPage";
import Cart from "../components/Cart";
import Checkout from "../pages/Checkout";

function AppRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Públicas */}
                <Route path="/login" element={<Login />} />

                {/* Protegidas */}
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <Orders />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/review"
                    element={
                        <PrivateRoute>
                            <ReviewPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;