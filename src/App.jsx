import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shared from './components/Shared';
import DonorMain from './pages/DonorMain';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import UrgentDonation from './pages/UrgentDonation';
// import DonorSignUp from './components/DonorSignUp'
// import DonorSignIn from './components/DonorSignIn';
import DonorCampaigns from './pages/DonorCampaigns';
import Home from './pages/Home';
import AvailableDonation from './pages/AvailableDonation';
import CenterMain from './pages/CenterMain';
import CheckStatus from './pages/CheckStatus';
import AddPost from './pages/AddPost';
import AddCampaign from './pages/AddCampaign';
import ManageReq from './pages/ManageReq';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        {/* Routes without shared layout */}
        {/* <Route path="/signup" element={<DonorSignUp />} />
        <Route path="/signin" element={<DonorSignIn />} /> */}

        <Route path="/home" element = {<Home />} /> 

        {/* Routes with shared layout */}
        <Route path="/" element={<Shared />}>
          <Route path="donor-main" element={<DonorMain />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="urgent-donation" element={<UrgentDonation />} />
          <Route path="available-donation" element={<AvailableDonation />} />
          <Route path="campaigns" element={<DonorCampaigns />} />
          <Route path="check" element={<CheckStatus />} />
        </Route>

        <Route>
        <Route path="center-main" element={<CenterMain />} />
        <Route path="add-post" element={<AddPost />} />
        <Route path="add-campaign" element={<AddCampaign />} />
        <Route path="manage-req" element={<ManageReq />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;