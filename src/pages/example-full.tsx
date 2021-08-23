import React from 'react';
import {
  NotionRenderer,
  Code,
  Equation,
  Collection,
  CollectionRow,
} from 'react-notion-x';

import { NextPage, GetStaticProps } from 'next';
import { NotionAPI } from 'notion-client';

import { firebaseAdmin } from '~/config/firebaseAdmin';

interface PageProps {
  recordMap: any;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const notion = new NotionAPI();

  const homeOptionsDoc = await firebaseAdmin
    .firestore()
    .collection('siteConfig')
    .doc('home')
    .get();

  const homeOptions = homeOptionsDoc.data();

  if (!homeOptions) {
    throw new Error('Home options not found');
  }

  const recordMap = await notion.getPage(homeOptions.notionId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

const PageComponent: NextPage<PageProps> = ({ recordMap }) => {
  return (
    <>
      <NotionRenderer
        components={{
          equation: Equation,
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
        }}
        recordMap={recordMap}
        fullPage
        darkMode
      />
    </>
  );
};

export default PageComponent;
