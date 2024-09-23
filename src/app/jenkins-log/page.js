'use client';

import { useState } from 'react';
import JenkinsLogStreamer from '@/components/JenkinsLogStreamer';

export default function JenkinsLogPage() {
  const [jobName, setJobName] = useState('my-react-ap1p-pipeline');
  const [buildNumber, setBuildNumber] = useState('6');
  const [streaming, setStreaming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStreaming(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jenkins Build Log Streamer</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          placeholder="Job Name"
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={buildNumber}
          onChange={(e) => setBuildNumber(e.target.value)}
          placeholder="Build Number"
          required
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-black p-2 rounded">Stream Log</button>
      </form>
      {streaming && <JenkinsLogStreamer jobName={jobName} buildNumber={buildNumber} />}
    </div>
  );
}