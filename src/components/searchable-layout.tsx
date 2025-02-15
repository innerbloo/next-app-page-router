import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import style from './searchable-layout.module.css';

type Props = {
    children: ReactNode;
};

export default function SearchableLayout({ children }: Props) {
    const router = useRouter();
    const { q } = router.query;
    const [search, setSearch] = useState('');

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        if (!search || q === search) return;

        router.push(`/search?q=${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    useEffect(() => {
        if (q) {
            setSearch(q as string);
        }
    }, [q]);

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    onKeyDown={onKeyDown}
                    onChange={onChangeSearch}
                    value={search}
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
