import React from 'react'
import SignIn from './index.jsx'
import { Provider } from 'react-redux'
import { store } from '../../redux/store.js'
import { signIn } from '../../redux/slices/auth'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

jest.mock('../../redux/slices/auth', () => ({
  signIn: jest.fn()
}))

describe('SignIn page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Render sign in page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  test('Send form values with sign in', async () => {
    const { getByLabelText, getByText, queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    )

    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const submitButton = getByText('Sign In')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1)
      expect(signIn).toHaveBeenCalledWith(
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
