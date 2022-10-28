import user from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import UserExampleForm from './UserExampleForm'

describe('UserExampleForm', () => {
  const onSave = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <UserExampleForm onSave={onSave} error={undefined} loading={false} />
      )
    }).not.toThrow()
  })

  it('should pre-fill all inputs', () => {
    render(
      <UserExampleForm
        onSave={onSave}
        error={undefined}
        loading={false}
        userExample={{
          id: 1,
          name: 'Harry Potter',
          email: 'harry.potter@hogwarts.ac.uk',
          dateOfBirth: new Date('1980-07-31').toISOString(),
        }}
      />
    )

    const nameInput = screen.getByLabelText(/name/i)
    expect(nameInput).toHaveValue('Harry Potter')

    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveValue('harry.potter@hogwarts.ac.uk')

    const dateOfBirthInput = screen.getByLabelText(/date of birth/i)
    expect(dateOfBirthInput).toHaveValue('1980-07-31')
  })

  it('should not call onSave when missing information', async () => {
    render(
      <UserExampleForm onSave={onSave} error={undefined} loading={false} />
    )

    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'Harry Potter')

    const dateOfBirthInput = screen.getByLabelText(/date of birth/i)
    await user.type(dateOfBirthInput, '1980-07-31')

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    expect(onSave).not.toHaveBeenCalled()
  })

  it('should call onSave when information submitted', async () => {
    render(
      <UserExampleForm onSave={onSave} error={undefined} loading={false} />
    )

    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'Harry Potter')

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'harry.potter@hogwarts.ac.uk')

    const dateOfBirthInput = screen.getByLabelText(/date of birth/i)
    await user.type(dateOfBirthInput, '1980-07-31')

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith(
      {
        name: 'Harry Potter',
        email: 'harry.potter@hogwarts.ac.uk',
        dateOfBirth: new Date('1980-07-31T00:00:00.000Z'),
      },
      undefined
    )
  })
})
