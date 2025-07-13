import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionAPIRequest } from './types/create-question-api-request';
import type { CreateQuestionAPIResponse } from './types/create-question-api-response';
import type { GetRoomQuestionsAPIResponse } from './types/get-room-questions-api-response';

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (question: CreateQuestionAPIRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/question`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question),
        }
      );

      const result: CreateQuestionAPIResponse = await response.json();

      return result;
    },

    // Executa no momento que for feita chamada para API

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsAPIResponse>([
        'get-questions',
        roomId,
      ]);

      const questionsArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<GetRoomQuestionsAPIResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions };
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionsAPIResponse>(['get-questions', roomId],
          questions => {
            if((!questions)){
              return questions
            }

            if(!context.newQuestion){
              return questions;
            }

            return questions.map(question => {
              if(question.id === context.newQuestion.id){
                return {...context.newQuestion, id: data.questionId, answer: data.answer}
              }

              return question
            })
          }
      )
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsAPIResponse>(
          ['get-questions', roomId],
          context.questions
        );
      }
    },
  });
}
