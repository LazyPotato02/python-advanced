function attachEvents() {
    const loadBooks = document.getElementById('loadBooks')
    const booksContainer = document.querySelector('table > tbody')
    const [titleInput, authorInput] = Array.from(document.querySelectorAll('#form > input'))
    const submitBtn = document.querySelector('#form > button')
    const formHeader = document.querySelector('#form > h3')
    let allBooks = {}
    let editBookId = null
    const BASE_URL = 'http://localhost:3030/jsonstore/collections/books/'

    loadBooks.addEventListener('click', loadAllBooksHandler)
    submitBtn.addEventListener('click', submitFormHandler)

    async function loadAllBooksHandler() {
        booksContainer.innerHTML = ''

        const booksRes = await fetch(BASE_URL)
        const booksData = await booksRes.json()
        allBooks = booksData
        for (const bookID in booksData) {
            const {author, title} = booksData[bookID]
            const tableRow = document.createElement('tr')
            const titleColumn = document.createElement('td')
            const authorColumn = document.createElement('td')
            const buttonsColumn = document.createElement('td')
            const editBtn = document.createElement('button')
            const deleteBtn = document.createElement('button')

            titleColumn.textContent = title
            authorColumn.textContent = author
            editBtn.textContent = 'Edit'
            deleteBtn.textContent = 'Delete'
            deleteBtn.id = bookID

            editBtn.addEventListener('click', () => {
                editBookId = bookID
                formHeader.textContent = 'Edit FORM'
                submitBtn.textContent = 'Save'
                titleInput.value = title
                authorInput.value = author
            })


            deleteBtn.addEventListener('click', deleteBookHandler)

            tableRow.appendChild(titleColumn)
            tableRow.appendChild(authorColumn)
            buttonsColumn.appendChild(editBtn)
            buttonsColumn.appendChild(deleteBtn)
            tableRow.appendChild(buttonsColumn)
            booksContainer.appendChild(tableRow)
        }

    }


    async function submitFormHandler() {
        const title = titleInput.value
        const author = authorInput.value

        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({title, author})
        }
        let url = BASE_URL

        if (formHeader.textContent === 'Edit FORM') {
            httpHeaders.method = 'PUT'
            url += editBookId


        }

        const resData = await fetch(url, httpHeaders)
        loadAllBooksHandler()
        if (formHeader.textContent === 'Edit FORM') {
            formHeader.textContent = 'FORM'
            submitBtn.textContent = 'Submit'

        }
        titleInput.value = ''
        authorInput.value = ''
    }

    async function deleteBookHandler() {
        const id = this.id
        const httpHeaders = {
            method: 'DELETE'
        }
        fetch(BASE_URL + id, httpHeaders)
        loadAllBooksHandler()
    }


}

attachEvents();