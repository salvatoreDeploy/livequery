import { useQuery } from "@tanstack/react-query";
import type { GetRoomsAPIResponse } from "./types/get-room-api-response";

export function useRooms(){
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const resultData: GetRoomsAPIResponse = await response.json();
      return resultData;
    },
  });
}