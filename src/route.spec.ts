import { stub } from 'sinon';
import * as test from 'tape';

import { YartRoute } from './route';

test('YartRoute', t => {
  t.plan(1);
  t.ok(new YartRoute());
});

test('append', t => {
  const route = new YartRoute();
  const push = stub(route._path, 'push').callThrough();
  const parts = ['this', 'is', 'a', 'test'];
  t.plan(5);
  for (const part of parts) {
    route.append(part);
    t.ok(push.calledWithExactly(part));
  }
  t.deepEqual(route._path, parts);
});

test('prepend', t => {
  const route = new YartRoute();
  const unshift = stub(route._path, 'unshift').callThrough();
  const parts = ['this', 'is', 'a', 'test'];
  t.plan(5);
  for (const part of parts) {
    route.prepend(part);
    t.ok(unshift.calledWithExactly(part));
  }
  t.deepEqual(route._path, parts.reverse());
});

test('path', t => {
  const route = new YartRoute();
  const join = stub(route._path, 'join').callThrough();
  const path = route.append('test').path();
  t.plan(2);
  t.ok(join.calledOnceWithExactly('/'));
  t.equal(path, '/test');
});
