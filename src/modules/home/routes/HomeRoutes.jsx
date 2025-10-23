import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Navbar } from "../../shared/Navbar";
import { ResetPassword } from "../../auth/pages/ResetPassword";
import { Categories } from "../pages/categories";

const HomeRoutes = () => {
    return (
        <section className="grid md:grid-cols-[320px_1fr] p-3">
            <div className="aside">
                <Navbar />
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </div>
        </section>
    );
};

export default HomeRoutes;