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

export interface RecategoriseRequest {
    ids: number[],
    collectionId: number
}

export interface Transfer {
    id: number,
    isbn: string,
    bookTitle: string,
    author: string[],
    transferFrom: string,
    transferTo: string,
    rejectedMessage: string
}

export interface TransferRequest {
    ids: number[],
    username: string
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
    email: string,
    password: string
}

export async function getBooks(pageNum: string, pageSize: string, sortBy: string, searchTerm: string): Promise<Book[]> {
    const page = (pageNum === "" ? "" : `?PageNumber=${pageNum}`) + (pageSize === "" ? "" : `&PageSize=${pageSize}`);
    const sort = sortBy === "" ? "" : page === "" ? `?SortBy=${sortBy}` : `&SortBy=${sortBy}`;
    const search = searchTerm === "" ? "" : page === "" && sort === "" ? `?SearchTerm=${searchTerm}` : `&SearchTerm=${searchTerm}`;

    const response = await fetch(`http://localhost:5108/books/current-user${page}${sort}${search}`, {
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

export async function recategoriseBooks(request: RecategoriseRequest) {
    const response = await fetch(`http://localhost:5108/books/recategorise`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
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

export async function getTransfers(): Promise<Transfer[]> {
    const response = await fetch(`http://localhost:5108/transfers`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export async function addTransfer(request: TransferRequest) {
    const response = await fetch(`http://localhost:5108/transfers`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function handleTransfer(id: number, action: string, message: string) {
    const response = await fetch(`http://localhost:5108/transfers/${action}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message),
    });
    if (!response.ok) {
        throw new Error(await response.json());
    }
}

export async function deleteTransfer(id: number) {
    const response = await fetch(`http://localhost:5108/transfers/${id}`, {
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

export async function deleteCollection(name: string) {
    const response = await fetch(`http://localhost:5108/collections`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(name),
    });
    if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again.";
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } finally {
            throw new Error(errorMessage);
        }
    };
}

export async function logIn(user: User) {
    const response = await fetch('http://localhost:5108/accounts/login', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again.";
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } finally {
            throw new Error(errorMessage);
        }
    };
    return response.json();
}

export async function signUp(newUser: NewUser) {
    const response = await fetch('http://localhost:5108/accounts', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
    });
    if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again.";
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } finally {
            throw new Error(errorMessage);
        }
    };
}