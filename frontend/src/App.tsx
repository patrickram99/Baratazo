import { useEffect, useState } from 'react'
import './App.css'
type Book = {
  id: string
  title: string
}
function App() {
  const [books, setBooks] = useState<Book[]>([])
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch('http://localhost:4000/books')
      const data = await response.json()
      setBooks(data)
    }
    getBooks()
  }, [])
  return (
    <>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  )
}
export default App