import HomePage from "./components/pages/home/home-page";
import { Routes, Route, Navigate } from "react-router-dom";
import DonateBloodPage from "./components/pages/donate-blood/donate-blood-page";
import HostBloodDrivePage from "./components/pages/host-blood-drive/host-blood-drive";
import NeedBloodPage from "./components/pages/need-blood/need-blood-page";
import ContactPage from "./components/pages/contact/contact-page";


export default function App() {
    return (
        <>
            {/* Header and Footer stay here if you want them on all pages */}
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route
                    path="/host-blood-drive"
                    element={<HostBloodDrivePage />}
                />
                <Route path="/donate-blood" element={<DonateBloodPage />} />
                <Route path="/need-blood" element={<NeedBloodPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* THE ADMIN BLOCK IS NOW GONE */}
            </Routes>
        </>
    );
}