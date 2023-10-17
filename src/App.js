import Homepage from "./homepage";
import Bookingpage from "./bookingpage";
import Slots from "./slots";
import Timing from "./timing";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<Bookingpage />} />
          <Route path="/timing" element={<Timing />} />
        </Routes>
      </Router>

    </>
  )
}
export default App;





