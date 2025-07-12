import { useQuery } from '@tanstack/react-query';
import type { GetRoomQuestionsAPIResponse } from './types/get-room-questions-api-response';

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`);

      const resultData: GetRoomQuestionsAPIResponse = await response.json();

      return resultData;
    },
  });
}

