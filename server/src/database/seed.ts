import {reset, seed} from 'drizzle-seed'
import { database, sqlClient} from './connection.ts';
import { schema } from './schema/index.ts';

await reset(database, schema);

await seed(database, schema).refine(f => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    }
  }
})

await sqlClient.end();

// biome-ignore lint/suspicious/noConsole: only used for debugging
console.log('Database seeded successfully');
