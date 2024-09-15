'use client';

import CodeEditorTextarea from '@/components/CodeEditor';
import { InputFile } from '@/components/InputFile';
import { Button } from '@/components/ui/button';
import { UpdatesTable } from '@/components/UpdatesTable';
import { checkPackageUpdates } from '@/server/checkPackageUpdate';
import React, { useState } from 'react';
import { toast } from 'sonner'; 

export type Update = ({
  package: string;
  currentVersion: string;
  latestVersion: string;
  updateType: string;
} | null)

const HomePage = () => {
  const [packageJsonContent, setPackageJsonContent] = useState('');
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setUpdates([]);

    try {
      const response = await checkPackageUpdates(packageJsonContent);

      if (!response.error && response.updates) {
        setUpdates(response.updates);
        toast.success('Analysis completed successfully'); 
      } else {
        toast.error(response.error || 'Error analyzing package.json');
      }
    } catch (err) {
      toast.error('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='max-w-[1440px] mx-auto pt-8 grid md:grid-cols-2 gap-8 px-4'>
      <div className='flex flex-col'>
        <InputFile setPackageJsonContent={setPackageJsonContent} />
        <br/>

        <label>
          Or paste the content of your package.json:
          <CodeEditorTextarea value={packageJsonContent} onChange={setPackageJsonContent} />
        </label>

      <Button onClick={handleAnalyze} disabled={loading || !packageJsonContent} className='mt-4'>
        {loading ? 'Checking new versions...' : 'Check Dependencies'}
      </Button>
      </div>

      {updates.length > 0 && (<UpdatesTable updates={updates} />)}
    </main>
  );
};

export default HomePage;
