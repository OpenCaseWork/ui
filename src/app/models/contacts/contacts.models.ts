import { AuditedEntity } from '../Audit/audit.models';

export class Contact extends AuditedEntity {
  /*[Column("contact_id")]*/
  public id: number;
  /*[Column("parent_id")]*/
  public constituentId: number;
  /*[Column("contact_type_id")]*/
  public contactTypeId: number;
  /*[Column("contact_text")]*/
  public value: string;
  /*[Column("contact_text_2")]*/
  public value2: string;
  /*[Column("contact_notes")]*/
  public notes: string;
  /*[Column("extension")]*/
  public extension: string;

}