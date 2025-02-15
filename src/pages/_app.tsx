import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
};

type Props = {
    Component: NextPageWithLayout;
    pageProps: AppProps['pageProps'];
};

export default function App({ Component, pageProps }: Props) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return (
        <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    );
}
