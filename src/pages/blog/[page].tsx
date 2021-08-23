import React from 'react';
import {
  NotionRenderer,
  Code,
  Equation,
  Collection,
  CollectionRow,
} from 'react-notion-x';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { NotionAPI } from 'notion-client';

import { firebaseAdmin } from '~/config/firebaseAdmin';

interface PageProps {
  recordMap: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const notion = new NotionAPI();

  const currentPage = context.params?.page as string;

  const pageOptionsDoc = await firebaseAdmin
    .firestore()
    .collection('blogPosts')
    .doc(currentPage)
    .get();

  const pageOptions = pageOptionsDoc.data();

  if (!pageOptions) {
    return {
      notFound: true,
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
  return (
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
  );
};

export default PageComponent;
