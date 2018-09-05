import * as test from 'tape';
import { YartParams } from './params';

test('YartParams', t => {
  t.plan(1);
  t.ok(new YartParams());
});

test('param', t => {
  const params = new YartParams();
  const result = params.param('test', 'TEST');
  t.plan(3);
  t.ok((<any>params._params).test, 'Key is set');
  t.equals((<any>params._params).test, 'TEST', 'Key === "TEST"');
  t.ok(result instanceof YartParams, 'Returns this');
});

test('params', t => {
  const params = new YartParams();
  const result = params.param('test', 'TEST').params();
  t.plan(1);
  t.equal(result, 'test=TEST');
});
