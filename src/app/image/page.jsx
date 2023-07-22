'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import usePexelClient from '@/hook/usePexelClient';

import { ModelBox } from '../search/page';
import Loading from '../loading';

import { motion } from 'framer-motion';

const Image = () => {
  const searchParams = useSearchParams();
  const client = useRouter();
  const id = searchParams.get('id');
  const pexelClient = usePexelClient();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData(id) {
    setLoading(true);
    const data = await pexelClient.photos.show({ id: id });
    setResult(data);
    setLoading(false);
  }

  useEffect(() => {
    getData(id);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 1 }}>
      <ModelBox item={result} setOpenModel={() => client.push('/')} />
    </motion.div>
  );
};

export default Image;
