export interface Book {
    id: number,
    isbn: string,
    title: string,
    subtitle?: string,
    authors: string[],
    translator?: string,
    language: string,
    originalLanguage?: string,
    collection: string,
    publicationYear: number,
    read?: boolean,
    notes?: string,
    tags: string[],
    owner: string
}

export interface BookRequest {
    isbn: string,
    title: string,
    subtitle?: string,
    authors: string[],
    translator?: string,
    language: string,
    originalLanguage?: string,
    collectionId: number,
    publicationYear: number,
    read?: boolean,
    notes?: string,
    tags: string[]
}

export interface Collection {
    id: number,
    name: string
}

export interface User {
    email: string,
    password: string
}

export interface NewUser {
    username: string,
    name: string,
    email: string,
    password: string
}

export async function getBooks(pageNum: string, pageSize: string, sortBy: string, searchTerm: string): Promise<Book[]> {
    const response = await fetch(`http://localhost:5108/books/current-user?PageNumber=${pageNum}&PageSize=${pageSize}&SortBy=${sortBy}&SearchTerm=${searchTerm}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function getAllBooks(searchTerm: string): Promise<Book[]> {
    const response = await fetch(`http://localhost:5108/books/all-users?SearchTerm=${searchTerm}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function addBook(book: BookRequest) {
    const response = await fetch(`http://localhost:5108/books`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book), 
    });
    
    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function updateReadStatus(id: number) {
    const response = await fetch(`http://localhost:5108/books/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function updateBookDetails(id: number, book: BookRequest) {
    const response = await fetch(`http://localhost:5108/books/edit/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function deleteBook(id: number) {
    const response = await fetch(`http://localhost:5108/books/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function getAllCollections(): Promise<Collection[]> {
    const response = await fetch("http://localhost:5108/collections/all", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function addCollection(name: string) {
    const response = await fetch(`http://localhost:5108/collections`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(name), 
    });
    
    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function logIn (user: User) {
    const response = await fetch('http://localhost:5108/accounts/login', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        let errorMessage = "";
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } finally {
            throw new Error(errorMessage);
        }
    };

    return response.json();
}

export async function signUp (newUser: NewUser) {
    const response = await fetch('http://localhost:5108/accounts', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        let errorMessage = "";
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } finally {
            throw new Error(errorMessage);
        }
    };
}