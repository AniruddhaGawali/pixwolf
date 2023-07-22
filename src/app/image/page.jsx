'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams,useRouter } from 'next/navigation';
import { ModelBox } from '../search/page';
import usePexelClient from '@/hook/usePexelClient';
import Loading from '../loading';

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
    <div>
      <ModelBox item={result} setOpenModel={()=> client.push('/')} />
    </div>
  );
};

export default Image;
