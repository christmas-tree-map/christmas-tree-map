import { setupServer } from 'msw/node';
import { handlers as courseHandlers } from '@/mocks/handlers/course';
import { handlers as feedHandlers } from '@/mocks/handlers/feed';
import { handlers as treeHandlers } from '@/mocks/handlers/tree';

export const server = setupServer(...treeHandlers, ...feedHandlers, ...courseHandlers);
