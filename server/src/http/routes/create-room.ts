
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import {z} from 'zod/v4';
import { database } from '../../database/connection.ts';
import { schema } from '../../database/schema/index.ts';


export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const {name, description} = request.body

      const result = await database.insert(schema.rooms).values({
        name,
        description,
      }).returning()

      const returnedRoom = result[0]

      if (!returnedRoom) {
        throw new Error('Failed to create room');
      }

      return reply.status(201).send({roomId: returnedRoom.id })
    }
  );
}