import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';

function App() {
	const [count, setCount] = useState(0);
	const [quote, setQuote] = useState('');

	const getKaamelottQuote = async () => {
		const quote = await axios.get('https://kaamelott.reiter.tf/quote/random');
		setQuote(quote.data.citation);
	};

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1 data-testid="quote">{quote ? quote : 'Vite + React'}</h1>
			<div className="card">
				<button data-testid="bouton-count" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<button data-testid="bouton-fetch" onClick={getKaamelottQuote}>
					Get random kaamelott quote
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
