import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Components :: Loading', () => {
    it('should render the loading spinner and message', () => {
        render(<Loading />);

        const spinnerElement = screen.getByRole('status', { name: 'Carregando' });
        expect(spinnerElement).toBeInTheDocument();

        const loadingMessage = screen.getByText('Carregando...');
        expect(loadingMessage).toBeInTheDocument();
    });
});

