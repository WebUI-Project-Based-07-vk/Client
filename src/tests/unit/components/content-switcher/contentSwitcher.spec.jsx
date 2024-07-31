import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import СontentSwitcher from './contentSwitcher'

describe('СontentSwitcher', () => {
  it('should render with the correct props', () => {
    const label = 'Test Label'
    render(<СontentSwitcher label={label} />)

    expect(screen.getByText(label)).toBeInTheDocument()
  })
})

it('should call the onChange function when the switch is clicked', () => {
  const handleChange = vi.fn()
  render(<СontentSwitcher onChange={handleChange} />)

  fireEvent.click(screen.getByRole('checkbox'))

  expect(handleChange).toHaveBeenCalled()
})

it('should render tooltips when tooltips props are passed', () => {
  const tooltip = 'Test Tooltip'
  render(<СontentSwitcher tooltip={tooltip} />)
  expect(screen.getByText(tooltip)).toBeInTheDocument()
})
