import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../src/components/common/About';

describe('About Component', () => {
  it('renders the title correctly', () => {
    render(<About />);
    const titleElement = screen.getByText('About InvestorData');
    expect(titleElement).toBeInTheDocument();
  });

  it('contains correct descriptions', () => {
    render(<About />);
    const textContent = screen.getByText(/we specialize in offering in-depth analytics/);
    expect(textContent).toBeInTheDocument();
  });
});
