import { Constituent } from './constituents.models';
import { ConstituentContact } from './constituents.models';
import { BaseResponse } from '../root.models';


export class ConstituentAggregate extends BaseResponse {
  public constituent: Constituent;
  public contacts: ConstituentContact[];

  constructor() {
    super();
    this.constituent = new Constituent();
  }

};
