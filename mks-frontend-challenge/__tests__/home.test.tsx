import '@testing-library/jest-dom'; // Importa as definições de tipo do jest-dom
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
 
    const heading = screen.getByRole('heading', {
      name: /mkssistemas/i
    });
 
    expect(heading).toBeInTheDocument(); // Aqui está a propriedade correta
  });
});
