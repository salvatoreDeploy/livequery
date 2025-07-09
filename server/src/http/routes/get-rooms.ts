import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { database } from '../../database/connection.ts';
import { schema } from '../../database/schema/index.ts';

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const result = await database.select({ id: schema.rooms.id , name: schema.rooms.name}).from(schema.rooms).orderBy(schema.rooms.createdAt)

    return result
  })
};
