import { ILoggedClass } from '../../core/logging/logged-class';

export class BaseStoreService implements ILoggedClass {

  constructor() {
  };

   getClassName(): string {
    return (<any>this).constructor.name;
  }
}
