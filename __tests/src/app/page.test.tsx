import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '@/app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByText(/Ignored nodes/)
 
    expect(heading).toBeInTheDocument()
  })
})