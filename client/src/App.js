import { Outlet, Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  CreateRecp,
  Profile,
  Settings,
  InitialHome,
  RecpGenerator,
  ProfileLayout,
  Followers,
  Following,
  AuthSuccess,
  MobLogin,
  MobSingUp,
  Recp,
  Search,
  Explore,
  UserProfile,
  Bookmark,
  Replies,
} from "./pages";
import { SavedRecp, ImageViewer } from "./components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// function Layout() {
//   const {user} = useSelector(state => state.user)
//   console.log(user)

//   return user?.accessToken ? (
//     <Outlet/>
//   ): (
//     <Navigate to='/'/>

//   )
// }

const ProtectedRoute = ({ user }) => {
 
  return user?.token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const { recps } = useSelector((state) => state.recps)

  const { user } = useSelector((state) => state.user);
 
  
  
  return (
    <div className="w-full min-[100vh] ">
      <Routes>
        <Route
          path="/"
          element={user.token ? <Home /> : <InitialHome />} //If userToken is present navigate to home else InitialHome component
        />
        
        <Route element={<ProtectedRoute user={user} />}>
          {/* <Route
            path="/"
            element={user.accessToken ? <Home /> : <InitialHome />}
          /> */}

          <Route path="/settings" element={<Settings />} />
          <Route path="/createrecp" element={<CreateRecp />} />
          <Route path="/recipe-generator" element={<RecpGenerator />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmark />} />
          {/* <Route path="/authsuccess" component={AuthSuccess} /> */}
          <Route path="/:username?" element={<Profile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/recp/:id/reply/:commentId" element={<Replies />} />
          <Route path="/saved" element={<SavedRecp />} />
          <Route path="/recp/:username?/:id?" element={<Recp />} />
          <Route path="/recp/:id?/photo/:index?" element={<ImageViewer posts={recps} />} />
          <Route path="/" element={<ProfileLayout />}>
            {/* Child routes will be rendered inside the <Outlet /> */}
            <Route path="followers" element={<Followers />} />
            <Route path="following" element={<Following />} />
          </Route>
        </Route>
        <Route path="/signup" element={<MobSingUp />} />
        <Route path="/login" element={<MobLogin />} />
        <Route
          path="/authsuccess"
          element={ <AuthSuccess /> }
        />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </div>
  );
}

export default App;
