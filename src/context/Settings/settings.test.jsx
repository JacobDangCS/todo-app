import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { SettingProvider, SettingContext } from './Settings';


describe('Setting Context', () => {
    test('provides initial state', () => {
        render(
            <SettingProvider>
                <SettingContext.Consumer>
                    {
                        ({ showComplete, pageItems, sort }) => (
                            <ul>
                                <li data-testid="show-complete">{showComplete.toString()}</li>
                                <li data-testid="page-items">{pageItems}</li>
                                <li data-testid="sort">{sort}</li>
                            </ul>
                        )
                    }
                </SettingContext.Consumer>
            </SettingProvider>
        );
        const completedLi = screen.getByTestId('show-complete');
        const pageItemLi = screen.getByTestId('page-items')
        const sortLi = screen.getByTestId('sort')
        expect(completedLi).toHaveTextContent('false');
        expect(pageItemLi).toHaveTextContent('3');
        expect(sortLi).toHaveTextContent('');
    })
});