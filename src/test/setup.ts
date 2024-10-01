import '@testing-library/jest-dom';

import { worker } from '@/mocks/worker';

beforeAll(() => worker.listen());
beforeEach(() => worker.resetHandlers());
afterAll(() => worker.close());

