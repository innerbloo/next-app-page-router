import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import style from './[id].module.css';

import fetchBooks from '@/lib/fetch-books';
import fetchOneBook from '@/lib/fetch-one-book';

export const getStaticPaths = async () => {
    const allBooks = await fetchBooks();

    const paths = allBooks.map((book) => {
        return { params: { id: String(book.id) } };
    });

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));

    if (!book) {
        return {
            notFound: true,
        };
    }

    return {
        props: { book },
    };
};

export default function Page({
    book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>한입북스</title>
                    <meta property="og:image" content="/thumbnail.png" />
                    <meta property="og:title" content="한입북스" />
                    <meta
                        property="og:description"
                        content="한입북스에 등록된 도서들을 만나보세요."
                    />
                </Head>
                <div>로딩중입니다.</div>
            </>
        );
    }

    if (!book) return '문제가 발생했습니다. 다시 시도하세요.';

    const { title, subTitle, description, author, publisher, coverImgUrl } =
        book;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={coverImgUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Head>
            <div className={style.container}>
                <div
                    style={{ backgroundImage: `url('${coverImgUrl}')` }}
                    className={style.cover_img_container}
                >
                    <img src={coverImgUrl} alt="도서 이미지" />
                </div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>
                    {author} | {publisher}
                </div>
                <div className={style.description}>{description}</div>
            </div>
        </>
    );
}
