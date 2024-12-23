import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('Components :: SearchInput', () => {
    it('should render the input with the provided placeholder', () => {
        render(
            <SearchInput
                value=""
                onChange={jest.fn()}
                onClear={jest.fn()}
                placeholder="Buscar algo..."
            />
        );

        const inputElement = screen.getByPlaceholderText('Buscar algo...');
        expect(inputElement).toBeInTheDocument();
    });

    it('should call onChange when typing in the input', () => {
        const onChangeMock = jest.fn();
        render(
            <SearchInput
                value=""
                onChange={onChangeMock}
                onClear={jest.fn()}
                placeholder="Buscar algo..."
            />
        );

        const inputElement = screen.getByPlaceholderText('Buscar algo...');
        fireEvent.change(inputElement, { target: { value: 'Teste' } });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith('Teste');
    });

    it('should render the clear button when value is not empty', () => {
        render(
            <SearchInput
                value="Teste"
                onChange={jest.fn()}
                onClear={jest.fn()}
                placeholder="Buscar algo..."
            />
        );

        const clearButton = screen.getByRole('button');
        expect(clearButton).toBeInTheDocument();
    });

    it('should call onClear when the clear button is clicked', () => {
        const onClearMock = jest.fn();
        render(
            <SearchInput
                value="Teste"
                onChange={jest.fn()}
                onClear={onClearMock}
                placeholder="Buscar algo..."
            />
        );

        const clearButton = screen.getByRole('button');
        fireEvent.click(clearButton);

        expect(onClearMock).toHaveBeenCalledTimes(1);
    });

    it('should not render the clear button when value is empty', () => {
        render(
            <SearchInput
                value=""
                onChange={jest.fn()}
                onClear={jest.fn()}
                placeholder="Buscar algo..."
            />
        );

        const clearButton = screen.queryByRole('button');
        expect(clearButton).not.toBeInTheDocument();
    });
});
