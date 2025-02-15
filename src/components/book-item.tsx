import Link from 'next/link';

import style from './book-item.module.css';

import type { BookData } from '@/types';

export default function BookItem(props: BookData) {
    const { id, title, subTitle, author, publisher, coverImgUrl } = props;

    return (
        <Link href={`/book/${id}`} className={style.container}>
            <img src={coverImgUrl} alt="도서 이미지" />
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subtitle}>{subTitle}</div>
                <br />
                <div className={style.author}>
                    {author} | {publisher}
                </div>
            </div>
        </Link>
    );
}
