/** biome-ignore-all lint/suspicious/noConsole: <teste> */

import { ArrowLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio, 'audio.webm');

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    await response.json();

    // console.log(result);
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log('Gavação Iniciada');
    };

    recorder.current.onstop = () => {
      console.log('Gavação Finalizada');
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não tem suporte a gravação');
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 5000);
  }

  return (
    <div className="container mx-auto min-h-screen max-w-4xl bg-zinc-950 px-4 py-8">
      <Link to="/">
        <Button variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Voltar ao Início
        </Button>
      </Link>
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        {isRecording ? (
          <Button onClick={stopRecording}>Pausar gravação</Button>
        ) : (
          <Button onClick={startRecording}>Gravar Audio</Button>
        )}
        {isRecording ? <p>Gravando</p> : <p>Pausado</p>}
      </div>
    </div>
  );
}
