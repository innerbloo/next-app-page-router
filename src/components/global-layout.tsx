import Link from 'next/link';
import { ReactNode } from 'react';

import style from './global-layout.module.css';

type Props = {
    children: ReactNode;
};

export default function GlobalLayout({ children }: Props) {
    return (
        <div className={style.container}>
            <header className={style.header}>
                <Link href={'/'}>📚 ONEBITE BOOKS</Link>
            </header>
            <main className={style.main}>{children}</main>
            <footer className={style.footer}>
                <a href="https://github.com/innerbloo" target="_blank">
                    제작 @innerbloo
                </a>
            </footer>
        </div>
    );
}
