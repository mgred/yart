import * as test from 'tape';
import { YartRequest } from './request';
import { Config } from './config';
import { spy } from 'sinon';

test('YartRequest', t => {
  const config: any = {
    adapter: spy()
  };
  t.plan(2);
  t.ok(new YartRequest(config));
  t.ok(config.adapter.calledWithNew);
});

test('config', t => {
  const config: any = {
    adapter: class {}
  };
  const yReq = new YartRequest(config);
  const input = { method: 'GET' };
  yReq.config(input);
  t.plan(1);
  t.deepEqual((<any>yReq).localConfig, input);
});

test('fire', t => {
  const reqSpy = spy();
  const config: any = {
    adapter: class {
      request = reqSpy;
    }
  };
  const yReq = new YartRequest(config);
  t.plan(1);
  yReq.fire();
  t.ok(reqSpy.calledOnceWithExactly(config));
});
