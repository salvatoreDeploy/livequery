import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { database } from '../../database/connection.ts';
import { schema } from '../../database/schema/index.ts';
import { generateAnswer, generateEmbeddings } from '../../services/gemini-ai.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/question',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const { question } = request.body;

      const embeddings = await generateEmbeddings(question);

      const embeddingsAsString = `[${embeddings.join(',')}]`

      const chunks = await database
        .select({
          id: schema.audioChunck.id,
          transcription: schema.audioChunck.transcription,
          similarity: sql<number>`1 - (${schema.audioChunck.embeddings} <=> ${embeddingsAsString}::vector)`
        })
        .from(schema.audioChunck)
        .where(
          and(
            eq(schema.audioChunck.roomId, roomId),
            sql`1 - (${schema.audioChunck.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
          )
        )
        .orderBy(sql`${schema.audioChunck.embeddings} <=> ${embeddingsAsString}::vector`)
        .limit(3);

        let answer: string | null = null

        if(chunks.length > 0){
          const transcriptions = chunks.map(chunck => chunck.transcription)

          answer = await generateAnswer(question, transcriptions)
        }

      const result = await database
        .insert(schema.questions)
        .values({
          roomId,
          question,
          answer
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create question');
      }

      return reply.status(201).send({ questionId: insertedQuestion.id, answer });
    }
  );
};
