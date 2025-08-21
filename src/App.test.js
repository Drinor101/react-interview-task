import { render, screen } from '@testing-library/react';
import App from './App';

test('renders inventory management system', () => {
  render(<App />);
  const titleElement = screen.getByText(/Title/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders status cards', () => {
  render(<App />);
  const onRoadElement = screen.getByText(/On Road/i);
  const completedElement = screen.getByText(/Completed/i);
  const onHoldElement = screen.getByText(/On Hold/i);
  
  expect(onRoadElement).toBeInTheDocument();
  expect(completedElement).toBeInTheDocument();
  expect(onHoldElement).toBeInTheDocument();
});

test('renders create button', () => {
  render(<App />);
  const createButton = screen.getByText(/Create/i);
  expect(createButton).toBeInTheDocument();
});
