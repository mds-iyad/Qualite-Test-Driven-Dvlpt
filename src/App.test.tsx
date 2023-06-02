import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import { test, expect, describe, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('Simple App.tsx tests', () => {
	test('Button count increments 1', async () => {
		// ARRANGE
		render(<App />);

		// ACT
		await userEvent.click(screen.getByTestId('bouton-count'));

		// ASSERT
		expect(screen.getByTestId('bouton-count')).toHaveTextContent('count is 1');
	});

	test('Button count has default 0 state', async () => {
		// ARRANGE
		render(<App />);

		// ACT

		// ASSERT
		expect(screen.getByTestId('bouton-count')).toHaveTextContent('count is 0');
	});

	test('Kaamelot button change the h1 content', async () => {
		axios.get.mockResolvedValue({
			data: {
				citation: 'Hello world',
			},
		});
		render(<App />);

		// ACT
		await userEvent.click(screen.getByTestId('bouton-fetch'));

		// ASSERT
		expect(screen.getByTestId('quote')).toHaveTextContent('Hello world');
	});

	test('h1 initial value should be Vite + React', async () => {
		render(<App />);

		// ACT
		//await userEvent.click(screen.getByTestId('bouton-fetch'));

		// ASSERT
		expect(screen.getByTestId('quote')).toHaveTextContent('Vite + React');
	});
});
