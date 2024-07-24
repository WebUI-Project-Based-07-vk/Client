import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import SearchInput from '~/components/search-input/SearchInput'
import { vi } from 'vitest'

// Mock TextField and Icons from MUI
vi.mock('@mui/material/TextField', () => ({
  default: ({ InputProps, ...props }) => (
    <div>
      <input {...props} />
      {InputProps?.startAdornment}
      {InputProps?.endAdornment}
    </div>
  )
}))
vi.mock('@mui/material/IconButton', () => ({
  default: ({ children, ...props }) => <button {...props}>{children}</button>
}))
vi.mock('@mui/icons-material/Clear', () => ({
  default: () => <div>ClearIcon</div>
}))
vi.mock('@mui/icons-material/Search', () => ({
  default: () => <div>SearchIcon</div>
}))

describe('SearchInput Component', () => {
  let setSearchMock

  beforeEach(() => {
    setSearchMock = vi.fn()
  })

  it('should render text correctly', () => {
    render(<SearchInput search='test' setSearch={setSearchMock} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('test')
  })

  it('should call setSearch when search icon is clicked', async () => {
    render(<SearchInput search='' setSearch={setSearchMock} />)
    const searchIcon = screen.getByTestId('search-icon')
    await userEvent.click(searchIcon)
    await waitFor(() => {
      expect(setSearchMock).toHaveBeenCalledWith('')
    })
  })

  it('should call setSearch with empty string when delete icon is clicked', async () => {
    render(<SearchInput search='test' setSearch={setSearchMock} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    await userEvent.click(deleteIcon)
    await waitFor(() => {
      expect(setSearchMock).toHaveBeenCalledWith('')
    })
  })

  it('should call setSearch when enter is pressed', async () => {
    render(<SearchInput search='' setSearch={setSearchMock} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'new search{enter}')
    await waitFor(() => {
      expect(setSearchMock).toHaveBeenCalledWith('new search')
    })
  })

  it('should have hidden class if search is empty', () => {
    render(<SearchInput search='' setSearch={setSearchMock} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('should have visible class if search is not empty', () => {
    render(<SearchInput search='test' setSearch={setSearchMock} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })
})
