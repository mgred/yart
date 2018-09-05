import { spy, stub } from 'sinon';
import * as test from 'tape';

import { FetchAdapter } from './fetch-adapter';

test('map', t => {
  const adapter = new FetchAdapter();
  const mock = stub().resolves('test');
  const cb = spy();
  t.plan(1);
  adapter.map(mock(), cb).then(() => {
    t.ok(cb.calledOnceWithExactly('test'));
  });
});

test('error', t => {
  const adapter = new FetchAdapter();
  const mock = stub().rejects('error');
  const cb = spy();
  t.plan(1);
  adapter.error(mock(), cb).then(() => {
    t.ok(cb.calledOnce);
  });
});
