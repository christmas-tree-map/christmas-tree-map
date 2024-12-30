import { setupServer } from 'msw/node';
import { handlers as feedHandlers } from '@/mocks/handlers/feed';
import { handlers as treeHandlers } from '@/mocks/handlers/tree';

export const server = setupServer(...treeHandlers, ...feedHandlers);
