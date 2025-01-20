import { setupWorker } from 'msw/browser';
import { handlers as courseHandlers } from '@/mocks/handlers/course';
import { handlers as feedHandlers } from '@/mocks/handlers/feed';
import { handlers as treeHandlers } from '@/mocks/handlers/tree';

export const worker = setupWorker(...treeHandlers, ...feedHandlers, ...courseHandlers);
