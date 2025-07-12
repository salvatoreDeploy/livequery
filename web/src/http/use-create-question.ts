import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionAPIRequest } from './types/create-question-api-request';
import type { CreateQuestionAPIResponse } from './types/create-question-api-response';

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (question : CreateQuestionAPIRequest) => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });

      const result: CreateQuestionAPIResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] });
    },
  });
}
