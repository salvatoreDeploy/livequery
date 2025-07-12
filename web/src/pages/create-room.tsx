import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { dayjs } from '@/utils/format-relative-date';

type GetRoomsAPIResponse = Array<{
  name: string;
  id: string;
  questionCount: string;
  createdAt: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const resultData: GetRoomsAPIResponse = await response.json();
      return resultData;
    },
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>Salas recentes</CardTitle>
              <CardDescription>
                Acesso rápido para as salas criadas recentementes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {isLoading && (
                <p className="text-muted-foreground text-sm">
                  Carregando salas aguarde...
                </p>
              )}

              {data?.map((room) => {
                return (
                  <Link
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 "
                    key={room.id}
                    to={`/rooms/${room.id}`}
                  >
                    <div className="flex-1 flex-col gap-1">
                      <h3 className="font-medium">{room.name}</h3>

                      <div className="flex items-center gap-2">
                        <Badge className="text-xs" variant="secondary">
                          {dayjs(room.createdAt).toNow()}
                        </Badge>
                        <Badge className="text-xs" variant="secondary">
                          {room.questionCount} pergunta(s)
                        </Badge>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-sm">
                      Entrar
                      <ArrowRight className="size-3" />
                    </span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
