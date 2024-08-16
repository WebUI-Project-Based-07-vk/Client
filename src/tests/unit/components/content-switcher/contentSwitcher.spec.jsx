import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

// Моки для MUI компонентів
vi.mock('@mui/material/Tooltip', () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid='tooltip' title={props.title}>
      {props.children}
    </div>
  )
}))

vi.mock('@mui/material/Typography', () => ({
  __esModule: true,
  default: (props) => (
    <h6 data-testid='typography' {...props}>
      {props.children}
    </h6>
  )
}))

vi.mock('@mui/material/Switch', () => ({
  __esModule: true,
  default: (props) => <input data-testid='switch' type='checkbox' {...props} />
}))

vi.mock('@mui/material/Stack', () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid='stack' {...props}>
      {props.children}
    </div>
  )
}))

describe('AppContentSwitcher Component', () => {
  const switchOptions = {
    left: { text: 'Left Option', tooltip: 'Left Tooltip' },
    right: { text: 'Right Option', tooltip: 'Right Tooltip' }
  }

  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        active
        onChange={() => {}}
        styles={{ padding: '20px' }}
        switchOptions={switchOptions}
        typographyVariant='h6'
      />
    )

    expect(screen.getByTestId('stack')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()

    // Перевірка правильності рендеру Typography компонентів без використання data-testid
    expect(screen.getByText('Left Option')).toBeInTheDocument()
    expect(screen.getByText('Right Option')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
    const mockOnChange = vi.fn()
    render(
      <AppContentSwitcher
        active
        onChange={mockOnChange}
        switchOptions={switchOptions}
        typographyVariant='h6'
      />
    )

    const switchElement = screen.getByTestId('switch')
    fireEvent.click(switchElement)

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should render tooltips with correct title attributes', () => {
    render(
      <AppContentSwitcher
        active
        onChange={() => {}}
        switchOptions={switchOptions}
        typographyVariant='h6'
      />
    )

    const tooltips = screen.getAllByTestId('tooltip')
    expect(tooltips).toHaveLength(2)
    expect(tooltips[0]).toHaveAttribute('title', 'Left Tooltip')
    expect(tooltips[1]).toHaveAttribute('title', 'Right Tooltip')
  })
})
