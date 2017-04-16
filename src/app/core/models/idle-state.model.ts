export class IdleState {
  state = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
}

const IdleStateEnum = {
  Idle: 'IdleState.Idle' as 'IdleState.Idle',
  Active: 'IdleState.Active' as 'IdleState.Active',
  Started: 'IdleState.Started' as 'IdleState.Started',
  Stopped: 'IdleState.Stopped' as 'IdleState.Stopped',
  TimedOut: 'IdleState.TimedOut' as 'IdleState.TimedOut'
};
type IdleStateEnum = (typeof IdleStateEnum)[keyof typeof IdleStateEnum];
export { IdleStateEnum };
