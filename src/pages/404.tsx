import React from 'react';
import { NotionRenderer } from 'react-notion-x';

import { NextPage, GetStaticProps } from 'next';
import { NotionAPI } from 'notion-client';

import { firebaseAdmin } from '~/config/firebaseAdmin';

interface PageProps {
  recordMap?: any;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const notion = new NotionAPI();

  const pageOptionsDoc = await firebaseAdmin
    .firestore()
    .collection('siteConfig')
    .doc('404')
    .get();

  const pageOptions = pageOptionsDoc.data();

  if (!pageOptions) {
    return {
      props: {},
      revalidate: 10,
    };
  }

  const recordMap = await notion.getPage(pageOptions.notionId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

const PageComponent: NextPage<PageProps> = ({ recordMap }) => {
  if (!recordMap) {
    return <h1>404</h1>;
  }

  return <NotionRenderer recordMap={recordMap} fullPage darkMode />;
};

export default PageComponent;
