export interface Book {
    id: string,
    title: string,
    subtitle?: string,
    author: string,
    translator?: string,
    language: string,
    originalLanguage?: string,
    collection: string,
    publicationYear: number,
    editionPublicationYear: number,
    read: boolean,
    notes?: string
}

export interface BookRequest {
    isbn: string,
    title: string,
    subtitle?: string,
    author: string,
    translator?: string,
    language: string,
    originalLanguage?: string,
    collectionId: number,
    publicationYear: number,
    editionPublicationYear: number,
    read: boolean,
    notes?: string
}

export interface Collection {
    id: number,
    name: string
}

export async function getAllBooks(): Promise<Book[]> {
    const response = await fetch("http://localhost:5108/books", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export async function getBooks(pageNum: string, pageSize: string, sortBy: string, searchTerm: string): Promise<Book[]> {
    const response = await fetch(`http://localhost:5108/books?PageNumber=${pageNum}&PageSize=${pageSize}&SortBy=${sortBy}&SearchTerm=${searchTerm}`, {
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