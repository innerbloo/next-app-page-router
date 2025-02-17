import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const q = context.query.q;
    const books = await fetchBooks(q as string);

    return {
        props: {
            books,
        },
    };
};

export default function Search({
    books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { q } = router.query;

    return (
        <div>{books?.map((book) => <BookItem key={book.id} {...book} />)}</div>
    );
}

Search.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
