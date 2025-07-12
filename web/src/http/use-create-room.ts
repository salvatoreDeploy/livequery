import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomAPIResquest } from "./types/create-room-api-request";
import type { CreateRoomAPIResponse } from './types/create-room-api-response';

export function useCreateRoom(){

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomAPIResquest) => {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result: CreateRoomAPIResponse = await response.json()

      return result
    },

    onSuccess: ()  => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
    }
  })
}