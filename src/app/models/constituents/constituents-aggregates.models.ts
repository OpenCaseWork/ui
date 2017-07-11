import { Constituent, ConstituentContact } from './constituents.models';

export class ConstituentAggregate {
  public constituent: Constituent;
  public contacts: ConstituentContact[];
  public jsonEntity: any;
  public jsonEntityId: number;

  constructor() {
    this.constituent = new Constituent();
    this.contacts = new Array<ConstituentContact>();
  }

};
