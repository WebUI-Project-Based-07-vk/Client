import { render, screen, waitFor } from '@testing-library/react'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

const optionsMock = ['option-1', 'option-2', 'goo-goo', 'ga-ga', 'moo']

vi.mock('@mui/material/Box', () => ({
  default: ({ children }) => <div>{children}</div>
}))

vi.mock('@mui/material/SearchIcon', () => ({
  default: () => <div>SearchIcon</div>
}))

vi.mock('@mui/material/IconButton', () => ({
  default: ({ children, ...props }) => (
    <button data-testid='search-autocomplete--clear-icon' {...props}>
      {children}
    </button>
  )
}))

vi.mock('@mui/material/Button', () => ({
  default: ({ children, ...props }) => (
    <button data-testid='search-autocomplete--search-butt' {...props}>
      {children}
    </button>
  )
}))

vi.mock('~/components/app-auto-complete/AppAutoComplete', () => ({
  default: ({ inputValue, onInputChange, onChange }) => (
    <div>
      <input
        data-testid='search-autocomplete--search-input'
        onChange={(e) => onInputChange(e, e.target.value)}
        value={inputValue}
      />
      <ul data-testid='search-autocomplete--options'>
        {optionsMock
          .filter((opt) => opt.includes(inputValue))
          .map((opt, i) => (
            <li
              key={i}
              onClick={() => {
                onChange({}, opt)
                onInputChange({}, opt)
              }}
            >
              {opt}
            </li>
          ))}
      </ul>
    </div>
  )
}))

describe('SearchAutocomplete component', () => {
  let setSearchMock = vi.fn()
  let searchInput

  beforeEach(() => {
    render(
      <SearchAutocomplete
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )

    searchInput = screen.getByTestId('search-autocomplete--search-input')
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders autocomplete with search input', () => {
    expect(searchInput).toBeInTheDocument()
  })

  it('should updates search input on typing', async () => {
    await userEvent.type(searchInput, 'option qwerty')
    expect(searchInput).toHaveValue('option qwerty')
  })

  it('should filters options on typing', async () => {
    await userEvent.type(searchInput, 'opt')

    await waitFor(() => {
      const filteredOptions = screen.getAllByRole('listitem')

      expect(filteredOptions).toHaveLength(2)
      expect(filteredOptions[0]).toHaveTextContent('option-1')
      expect(filteredOptions[1]).toHaveTextContent('option-2')
    })
  })

  it('should selects an option on click', async () => {
    await userEvent.click(searchInput)

    await waitFor(async () => {
      const options = screen.getAllByRole('listitem')
      await userEvent.click(options[0])

      expect(searchInput.value).toEqual(options[0].textContent)
    })
  })

  it('should clears search input on clear icon click', async () => {
    const clearIcon = screen.getByTestId('search-autocomplete--clear-icon')
    await userEvent.click(clearIcon)

    expect(setSearchMock).toHaveBeenCalledWith('')
  })

  it('should triggers search on search button click', async () => {
    const searchButt = screen.getByTestId('search-autocomplete--search-butt')
    await userEvent.click(searchButt)

    expect(setSearchMock).toHaveBeenCalledWith(searchInput.value)
  })
})
