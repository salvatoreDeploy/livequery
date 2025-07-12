import { useRoomQuestions } from '@/http/use-room-question';
import { QuestionItem } from './question-item';

interface RoomQuestionsProps {
  roomId: string;
}

export function QuestionList({ roomId }: RoomQuestionsProps) {
  const { data } = useRoomQuestions(roomId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map((question) => {
        return <QuestionItem key={question.id} question={question} />;
      })}
    </div>
  );
}
