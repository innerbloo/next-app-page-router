import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import books from '@/mock/books.json';

export default function Search() {
    const router = useRouter();
    const { q } = router.query;

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

Search.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
