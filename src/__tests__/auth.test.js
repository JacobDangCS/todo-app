import '@testing-library/jest-dom';
import { fireEvent, screen, render } from '@testing-library/react';
import Auth from '../Components/Auth/Auth';
import Login from '../Components/Login/Login';
import AuthProvider, { AuthContext } from '../context/Auth/Auth';

describe('Auth integration', () => {
    test('It contains the initial user & isLoggedIn values', () => {
        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {
                        ({ isLoggedIn, user }) => (
                            <>
                                <p data-testid="isLoggedIn">{isLoggedIn.toString()}</p>
                                <p data-testid="user-object">{typeof(user)}</p>
                                <p data-testid="userKeys">{Object.keys(user).length}</p>
                            </>
                        )
                    }
                </AuthContext.Consumer>
            </AuthProvider>
        );

        const isLoggedInParagraph = screen.getByTestId('isLoggedIn');
        const userObjectParargraph = screen.getByTestId('userObject');
        const userKeysParargraph = screen.getByTestId('userKeys');

        expect(isLoggedInParagraph).toHaveTextContent('false');
        expect(userObjectParargraph).toHaveTextContent('object');
        expect(userKeysParargraph).toHaveTextContent('keys')
    });
});