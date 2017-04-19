import { Injectable }               from '@angular/core';
import { Idle,
         DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { IdleState, IdleStateEnum } from './models/idle-state.model';
import { LogService }               from './logging/log.service';
import { AuthService }              from './auth/auth.service';
import { EnvironmentService }       from './environment.service';

/** Service used to monitor user activity, warn user when inactive,
 * and log user out when activity limit reached
 */
@Injectable()
export class IdleService {
  idleState = new IdleState;

  constructor(
    private idle: Idle,
    private logService: LogService,
    private authService: AuthService,
    private environmentService: EnvironmentService
    ) {

    // sets an idle timeout in seconds
    this.setIdle(environmentService.idleSeconds);

    // sets a timeout warning period of seconds.
    this.setTimeout(environmentService.idleCountdownSeconds);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState.state = IdleStateEnum.Active);
    idle.onTimeout.subscribe(() => {
      this.idleState.state = IdleStateEnum.TimedOut;
      this.idleState.timedOut = true;
      logService.warn(this.idleState.state);
      authService.logout(); // could also route to logon page...
    });
    idle.onIdleStart.subscribe(() => {
      this.idleState.state = IdleStateEnum.Idle;
      logService.warn(this.idleState.state);
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      // TODO: put up angular warning screen for timeout
      this.idleState.state = 'You will time out in ' + countdown + ' seconds!';
      logService.log(this.idleState.state);
    });
  }

  /** sets Idle length of time in seconds to wait for inactivity before warning user
   * @param seconds - number of seconds
  */
  setIdle(seconds: number) {
    this.idle.setIdle(seconds);
    this.logService.log('IdleService.setIdle:' + seconds);
  }

  /** set length of time in seconds user has to do something before getting logged out
   * @param seconds - number of seconds
   */
  setTimeout(seconds: number) {
    this.idle.setTimeout(seconds);
    this.logService.log('IdleService.setTimeout:' + seconds);
  }

  /** enables/resets the idle watcher to start checking for user inactivity
   */
  reset() {
    this.idle.watch();
    this.idleState.state = IdleStateEnum.Started;
    this.idleState.timedOut = false;
  }

  /** stops the idle watcher */
  stop() {
    this.idleState.state = IdleStateEnum.Stopped;
    this.idleState.timedOut = true;
  }
}
