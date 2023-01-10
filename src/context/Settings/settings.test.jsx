import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { SettingProvider, SettingContext} from './Settings';


describe('Setting Context', () => {
    test('provides initial state', () => {
        render(
            <SettingProvider>
                <SettingContext.Consumer>
                    {
                        ({ mode }) => (
                            <>
                                <h3 data-testid='setting-test'>test: {mode}</h3>
                            </>
                        )
                    }
                </SettingContext.Consumer>
            </SettingProvider>
        );
        const h3 = screen.getByTestId('setting-test');
        expect(h3).toHaveTextContent('test: ');
    })
});