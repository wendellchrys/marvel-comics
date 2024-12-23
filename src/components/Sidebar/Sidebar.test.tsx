import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { useFavoritesModal } from '@/app/context/FavoritesModalContext';

jest.mock('@/app/context/FavoritesModalContext', () => ({
    useFavoritesModal: jest.fn(),
}));

describe('Components :: Sidebar', () => {
    const toggleSidebarMock = jest.fn();
    const openModalMock = jest.fn();

    beforeEach(() => {
        (useFavoritesModal as jest.Mock).mockReturnValue({
            openModal: openModalMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the sidebar when isOpen is true', () => {
        render(<Sidebar isOpen={true} toggleSidebar={toggleSidebarMock} />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('menu-header')).toBeInTheDocument();
    });

    it('should not render the sidebar when isOpen is false', () => {
        render(<Sidebar isOpen={false} toggleSidebar={toggleSidebarMock} />);

        expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    });

    it('should call toggleSidebar when the menu button is clicked', () => {
        render(<Sidebar isOpen={false} toggleSidebar={toggleSidebarMock} />);

        const menuButton = screen.getByTestId('menu-button');
        fireEvent.click(menuButton);

        expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
    });

    it('should call toggleSidebar when the overlay is clicked', () => {
        render(<Sidebar isOpen={true} toggleSidebar={toggleSidebarMock} />);

        const overlay = screen.getByTestId('overlay');
        fireEvent.click(overlay);

        expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
    });

    it('should call openModal when the "Favoritos" button is clicked', () => {
        render(<Sidebar isOpen={true} toggleSidebar={toggleSidebarMock} />);

        const favoritosButton = screen.getByTestId('favoritos-button');
        fireEvent.click(favoritosButton);

        expect(openModalMock).toHaveBeenCalledTimes(1);
    });
});
