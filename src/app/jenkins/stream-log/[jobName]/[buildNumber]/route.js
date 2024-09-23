import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { jobName, buildNumber } = params;

  const springBackendUrl = `http://localhost:8080/api/jenkins/stream-log/${jobName}/${buildNumber}`;

  try {
    const response = await fetch(springBackendUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
      },
    });

    if (!response.ok) {
      throw new Error(`Spring backend responded with status: ${response.status}`);
    }

    // Forward the response from Spring backend to the client
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error proxying to Spring backend:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch log stream' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}