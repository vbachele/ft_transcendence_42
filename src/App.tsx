import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Leaderboard from 'pages/Leaderboard';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import useFetchPlayer from 'hooks/useFetchPlayer';

function App() {
	const player = useFetchPlayer();

	return (
		<Router>
			<div className="App">
				<Navbar player={player} />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/leaderboard" element={<Leaderboard />} />
						<Route path='/dashboard/:id' element={<Dashboard />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App;
