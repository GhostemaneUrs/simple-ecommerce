import React from 'react'
import SignUp from './index.jsx'
import { Provider } from 'react-redux'
import { store } from '../../redux/store.js'
import { signUp } from '../../redux/slices/auth'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

jest.mock('../../redux/slices/auth', () => ({
  signUp: jest.fn()
}))

describe('Sign up page', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Clear all mock functions before each test
  })

  test('Render sign up page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  test('Send form values with sign up', async () => {
    const { getByLabelText, getByRole, queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/sign-up']}>
          <SignUp />
        </MemoryRouter>
      </Provider>
    )

    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const confirmPasswordInput = getByLabelText('Confirm Password')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })

    const submitButton = getByRole('button', { name: /sign up/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledTimes(1)
      expect(signUp).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        expect.any(Function)
      )
    })

    // Verify that MockLottie is present to ignore the animation
    const mockLottie = queryByTestId('mock-lottie')
    expect(mockLottie).toBeInTheDocument()
  })
})
