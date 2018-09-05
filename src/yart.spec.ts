import * as proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';
import * as test from 'tape';

const applyMixinStub = stub();
const configStub = stub();
const appendStub = stub();
const deps = {
  './params': { YartParams: {} },
  './route': { YartRoute: {} },
  './request': {
    YartRequest: class {
      config = configStub.returnsThis();
      append = appendStub.returnsThis();
    }
  },
  './mixin': { default: applyMixinStub }
};
const getNewYartInstance = () =>
  new (proxyquire.noCallThru()('./yart', deps)).Yart({});
const resetStubs = () =>
  [appendStub, applyMixinStub, configStub].map(s => s.resetHistory());

test('Yart', t => {
  const yart = getNewYartInstance();
  t.plan(1);
  t.ok(yart);
});

test('constructor', t => {
  const { Yart } = proxyquire.noCallThru()('./yart', deps);
  const initSpy = spy(Yart.prototype, 'initialize');
  const bootSpy = spy(Yart.prototype, 'boot');
  new Yart({});
  t.plan(2);
  t.ok(bootSpy.calledOnce);
  t.ok(initSpy.calledImmediatelyAfter(bootSpy));
});

test('delete', t => {
  const yart = getNewYartInstance();
  resetStubs();
  yart.delete('test');
  t.plan(2);
  t.ok(configStub.calledOnceWithExactly({ method: 'DELETE', body: null }));
  t.ok(appendStub.calledOnceWithExactly('test'));
});

test('delete, with optional body', t => {
  const yart = getNewYartInstance();
  const body = 'test';
  resetStubs();
  yart.delete('test', body);
  t.plan(1);
  t.ok(configStub.calledOnceWithExactly({ method: 'DELETE', body }));
});

test('update', t => {
  const yart = getNewYartInstance();
  resetStubs();
  yart.update('test', {});
  t.plan(2);
  t.ok(configStub.calledOnceWithExactly({ method: 'PUT', body: {} }));
  t.ok(appendStub.calledOnceWithExactly('test'));
});

test('select', t => {
  const yart = getNewYartInstance();
  resetStubs();
  yart.select('test');
  t.plan(2);
  t.ok(configStub.calledOnceWithExactly({ method: 'GET' }));
  t.ok(appendStub.calledOnceWithExactly('test'));
});

test('select', t => {
  const yart = getNewYartInstance();
  const selectSpy = spy();
  resetStubs();
  // find() is an alias that just calls select()
  yart.select = selectSpy;
  yart.find('test');
  t.plan(1);
  t.ok(selectSpy.calledOnceWithExactly('test'));
});
