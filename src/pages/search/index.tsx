import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';

export default function Search() {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    };

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q]);

    return (
        <>
            <Head>
                <title>한입북스 - {q}</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content={`한입북스 - ${q}`} />
                <meta
                    property="og:description"
                    content="한입북스에 등록된 도서들을 만나보세요."
                />
            </Head>
            <div>
                {books?.map((book) => <BookItem key={book.id} {...book} />)}
            </div>
        </>
    );
}

Search.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
