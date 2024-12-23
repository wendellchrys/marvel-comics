import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Components :: Modal', () => {
    it('should render the modal when isOpen is true', () => {
        render(
            <Modal isOpen={true} onClose={jest.fn()} title="Modal Title">
                <p>Modal Content</p>
            </Modal>
        );

        const modalTitle = screen.getByText('Modal Title');
        expect(modalTitle).toBeInTheDocument();

        const modalContent = screen.getByText('Modal Content');
        expect(modalContent).toBeInTheDocument();
    });

    it('should not render the modal when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={jest.fn()} title="Modal Title">
                <p>Modal Content</p>
            </Modal>
        );

        const modalTitle = screen.queryByText('Modal Title');
        expect(modalTitle).not.toBeInTheDocument();

        const modalContent = screen.queryByText('Modal Content');
        expect(modalContent).not.toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
        const onCloseMock = jest.fn();
        render(
            <Modal isOpen={true} onClose={onCloseMock} title="Modal Title">
                <p>Modal Content</p>
            </Modal>
        );

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
